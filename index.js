/*
* by: Clan AesirBR
* Developers: Tutz, Yaerius
* v. 1.0
* ~~~ A zoeira não tem limites ~~~
*
* TODO:
*  1. Refatorar as entradas para uma camada de serviço, separando o "controlador" de entrada da funcionalidade;
*  2.1. O arquivo index.js irá possuir apenas os camandos de entradas, dentro deverá ter apenas a chamada de uma função, implementando um facade;
* */

// imports
const {Client, MessageAttachment} = require('discord.js');
const listaMvpObject = require('./domain/MvpTrackerLista');
const mvpTrackerUtil = require('./util/MvpTrackerUtil');
const msgUtil = require('./util/MsgUtil');
const propertiesReader = require('properties-reader');
const timeChecker = require('./service/TimeChecker');

// carregar arquivos propriedades
const properties = propertiesReader('properties');
const deletarMensagemHorarios = properties.get('bot.message.delete.tracker');
const deletarMensagemGeral = properties.get('bot.message.delete.geral');

// config bot
const bot = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
bot.login(process.env.BOT_TOKEN);
const prefix = '%';

// lista MVPs
var listaMvp;

// carregar bot
bot.on('ready', () => {
    listaMvp = new listaMvpObject();
    listaMvp.gerarLista();
    exports.listaMvp = listaMvp;

    new timeChecker().mvpRespawnChecker(bot);

    console.log('O pau está DURASSO!');
});

bot.on('message', (msg) => {

    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).split(' ');

    /* *******************
    * CLEAR
    * ***************** */

    if (msg.content.startsWith(prefix + "clear")) {
        // comando clear
        if (msg.member.roles.cache.has(properties.get('bot.id.role.odin').replace(/'/g, '').trim())) {
            if (!args[1]) return msg.reply('Quantas mensagens, seu burro? <:whymario:709544275842564126>');
            (args[1] > 20) ? msg.channel.bulkDelete(20) : msg.channel.bulkDelete(args[1]);
            return;
        } else {
            msg.reply('tu é bobo, é?! <:lookguy:709808465123475477>')
        }
    }


    /* ****************
    * MVP TRACKER
    * ****************/
    /* **********************
    * comandos com argumentos
    *********************** */
    if (args.length > 1) {

        // pesquisar mvp por id ou nome
        if (msg.content.startsWith(prefix + "mvp") && (args[1] === "-p" || args[1] === "-P")) {
            let idMvp;
            if (!args[2]) {
                msg.channel.send("Informe a ID ou o nome do MVP <:whylink:709543789672529982>").then(msg => {
                    msg.delete({timeout: deletarMensagemGeral});
                }).catch();
                return;
            }
            if (args[1] === "-P") {
                idMvp = args[2];
                if (!listaMvp.getLista().get(idMvp)) {
                    msg.channel.send("Não encontramos esse MVP na base <:hmm:714561399816192081>").then(msg => {
                        msg.delete({timeout: deletarMensagemGeral});
                    }).catch();
                    return;
                }
            }
            if (args[1] === "-p") {
                idMvp = new mvpTrackerUtil().pesquisarMvpPorNome(new mvpTrackerUtil().construirNomeMvp(args, 2), listaMvp.getLista());
                if (!idMvp || idMvp === '') {
                    msg.channel.send("Não encontramos esse MVP na base <:hmm:714561399816192081>").then(msg => {
                        msg.delete({timeout: deletarMensagemGeral});
                    }).catch(console.error);
                    return;
                }
            }

            let horaRespawnNaoFormatada = new mvpTrackerUtil().calcularRespawn(listaMvp.getLista().get(idMvp).horaMinutoMorte, listaMvp.getLista().get(idMvp).tempoDeRespawn);
            msg.channel.send("Nome MVP: " + listaMvp.getLista().get(idMvp).nomeMvp +
                "\nMapa: " + listaMvp.getLista().get(idMvp).mapa +
                "\nRespawn: " + new mvpTrackerUtil().converterHoraParaString(horaRespawnNaoFormatada) +
                "\nCoordenadas: " + listaMvp.getLista().get(idMvp).coordenadasTumulo, listaMvp.getLista().get(idMvp).imagem).then(msg => {
                msg.delete({timeout: deletarMensagemGeral});
            }).catch(console.error);
            return;
        }

        // incluir mvp por id ou nome
        if (msg.content.startsWith(prefix) + "mvp" && (args[1] === "-a" || args[1] === "-A")) {
            let idMvp;
            if (!/^([1-9]|0[1-9]|[12]\d|3[01])$/.test(args[2])) {
                msg.channel.send("Informe uma data válida entre 1 e 31 <:pif:709554909585997884>").then(msg => {
                    msg.delete({timeout: deletarMensagemGeral});
                }).catch(console.error);
                return;
            }
            if (!/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/.test(args[3])) {
                msg.channel.send("O horário deve ser válido e no formato hh:mm <:pif:709554909585997884>").then(msg => {
                    msg.delete({timeout: deletarMensagemGeral});
                }).catch(console.error);
                return;
            }
            if (!/^\d{1,4}\/\d{1,4}$/.test(args[4])) {
                msg.channel.send("A coordenada deve ser válida e no formato x/y <:pif:709554909585997884>").then(msg => {
                    msg.delete({timeout: deletarMensagemGeral});
                }).catch(console.error);
                return;
            }
            if (args[1] === "-a") {
                idMvp = new mvpTrackerUtil().pesquisarMvpPorNome(new mvpTrackerUtil().construirNomeMvp(args, 5), listaMvp.getLista());
                if (!idMvp || idMvp === '') {
                    msg.channel.send("Esse MVP não existe na base <:yikesUE:709808464636936482>").then(msg => {
                        msg.delete({timeout: deletarMensagemGeral});
                    }).catch(console.error);
                    return;
                }
            }
            if (args[1] === "-A") {
                idMvp = args[5];
                if (!listaMvp.get(idMvp)) {
                    msg.channel.send("Esse MVP não existe na base <:yikesUE:709808464636936482>").then(msg => {
                        msg.delete({timeout: deletarMensagemGeral});
                    }).catch(console.error);
                    return;
                }
            }
            listaMvp.getLista().get(idMvp).horaMinutoMorte = new Date("2020-01-" + args[2] + "T" + args[3] + ":00.000");
            listaMvp.getLista().get(idMvp).coordenadasTumulo = args[4];
            msg.channel.send("Horário adicionado com sucesso <:babyfist:709808463462793340>").then(msg => {
                msg.delete({timeout: deletarMensagemGeral});
            }).catch(console.error);
            return;
        }
    }

    /* **********************
    * comandos sem argumentos
    * **********************/
    if (msg.content.startsWith(prefix + "resetar") && msg.member.roles.cache.has(properties.get('bot.id.role.odin').replace(/'/g, '').trim())) {
        listaMvp.gerarLista();
        msg.channel.send("Lista resetada <:meh:709554743109877760>").then(msg => {
            msg.delete({timeout: deletarMensagemGeral});
        }).catch(console.error);
        return;
    }

    // lista todas as entradas
    if (msg.content.startsWith(prefix + "horarios")) {
        let contagem = 0;

        listaMvp.getLista().forEach(function (value, key) {
            if (value.horaMinutoMorte) {
                contagem++;
                let horaRespawnNaoFormatada = new mvpTrackerUtil().calcularRespawn(value.horaMinutoMorte, value.tempoDeRespawn);
                msg.channel.send(value.nomeMvp + "\n" +
                    "> Mapa: " + value.mapa + ", Respawn: " + new mvpTrackerUtil().converterHoraParaString(horaRespawnNaoFormatada)).then(msg => {
                    msg.delete({timeout: deletarMensagemHorarios});
                }).catch(console.error);
            }
        }, listaMvp.getLista());
        if (contagem === 0) msg.channel.send("Não existem horários cadastrados. <:sOb:709554981916639282>").then(msg => {
            msg.delete({timeout: deletarMensagemGeral});
        }).catch(console.error);
        return;
    }

    if (msg.content.startsWith(prefix + "aura")) {
        msg.reply(new msgUtil(bot).aura()).then(msg => {
            msg.delete({timeout: deletarMensagemHorarios});
        }).catch(console.error);
        return;
    }

    if (msg.content.startsWith(prefix + "help")) {
        msg.author.send({
            embed: new msgUtil(bot).help(),
            files: [{
                attachment: 'images/ragnarok_gifs/MVP.png',
                name: 'MVP.png'
            },
            {
                attachment: 'images/ragnarok_gifs/help.gif',
                name: 'help.gif'
            }]});
    }

    if(msg.content.startsWith(prefix + "time")){
        let a = new Date();
        msg.author.send(a.toDateString() + " - " + a.toTimeString());
    }
});

/* *******************
* EASTER EGGS
* ***************** */
bot.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content === "loli") {
        const attachment1 = new MessageAttachment('./images/aesir_gifs/safadinho.gif');
        msg.channel.send(attachment1);
        return;
    }
    if (msg.content === "acorda") {
        const attachment2 = new MessageAttachment('./images/aesir_gifs/acorda.gif');
        msg.channel.send(attachment2);
        return;
    }
    if (msg.content === "macaco") {
        const attachment3 = new MessageAttachment('./images/aesir_gifs/macaco.gif');
        msg.channel.send(attachment3);
        return;
    }
    if (msg.content === "sarrada") {
        const attachment4 = new MessageAttachment('./images/aesir_gifs/sarrada.gif');
        msg.channel.send(attachment4);
        return;
    }
    if (msg.content === "duwafufaito") {
        const attachment5 = new MessageAttachment('./images/aesir_gifs/duwafufaito.gif');
        msg.channel.send(attachment5);
    }
    if (msg.content === "pterodatilo") {
        const attachment6 = new MessageAttachment('./images/aesir_gifs/ptero.gif');
        msg.channel.send(attachment6);
    }
    if (msg.content === "o que a aesir mais gosta?") {
        msg.reply('Duwãfufaito!!! <:orgasmtwitch:709561477324865603> <:durasso:709555094227779624>');
        return;
    }
    if (msg.content === "que preguiça") {
        msg.reply('Vai farmar fdp!! <:putassoTom:709561478205931662>');
        return;
    }
    if (msg.content === "me beija") {
        msg.reply('Awh! <:orgasm:709544168594341928>');
        return;
    }
    if (msg.content === "1%") {
        msg.channel.send("Oloko" + " " + msg.author.username + ', mas 1% é bom demais! <:trollface:709561477165613114>');
        return;
    }
    if (msg.content === "quantas bsb gastou?") {
        msg.reply('Fala 300... Fala 300... <:meGusta:709808464238477445>');
        return;
    }
    if (msg.content === "300") {
        msg.reply('Um pouco mais... <:bitchplease:709808464414900324>');
        return;
    }
});

    
    
    

                