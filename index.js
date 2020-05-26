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
const generalUtil = require('./util/GeneralUtil');
const msgUtil = require('./util/MsgUtil');
const propertiesReader = require('properties-reader');
const timeChecker = require('./service/TimeChecker');

// carregar arquivos propriedades
const properties = propertiesReader('properties');
const deletarMensagemHorarios = properties.get('bot.message.delete.tracker');
const deletarMensagemGeral = properties.get('bot.message.delete.geral');

// config bot
const bot = new Client();
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
            if (!args[1]) return msg.reply('Quantas mensagens, seu burro?');
            (args[1] > 20) ? msg.channel.bulkDelete(20) : msg.channel.bulkDelete(args[1]);
            return;
        } else {
            msg.reply('tu é bobo, é?!');
            return;
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
                msg.channel.send("Informar uma ID ou nome do MVP").then(msg => {
                    msg.delete({timeout: deletarMensagemGeral});
                }).catch();
                return;
            }
            if (args[1] === "-P") {
                idMvp = args[2];
                if (!listaMvp.getLista().get(idMvp)) {
                    msg.channel.send("MVP não encontrado na base").then(msg => {
                        msg.delete({timeout: deletarMensagemGeral});
                    }).catch();
                    return;
                }
            }
            if (args[1] === "-p") {
                idMvp = new mvpTrackerUtil().pesquisarMvpPorNome(new mvpTrackerUtil().construirNomeMvp(args, 2), listaMvp.getLista());
                if (!idMvp || idMvp === '') {
                    msg.channel.send("MVP não encontrado na base").then(msg => {
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
            if (!/^(0[1-9]|[12]\d|3[01])$/.test(args[2])) {
                msg.channel.send("Informar uma data válida 01-31").then(msg => {
                    msg.delete({timeout: deletarMensagemGeral});
                }).catch(console.error);
                return;
            }
            if (!/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/.test(args[3])) {
                msg.channel.send("O horário deve ser válido e no formato hh:mm").then(msg => {
                    msg.delete({timeout: deletarMensagemGeral});
                }).catch(console.error);
                return;
            }
            if (!/^\d{1,4}\/\d{1,4}$/.test(args[4])) {
                msg.channel.send("A coordenada deve ser válida e no formato x/y").then(msg => {
                    msg.delete({timeout: deletarMensagemGeral});
                }).catch(console.error);
                return;
            }
            if (args[1] === "-a") {
                idMvp = new mvpTrackerUtil().pesquisarMvpPorNome(new mvpTrackerUtil().construirNomeMvp(args, 5), listaMvp.getLista());
                if (!idMvp || idMvp === '') {
                    msg.channel.send("MVP não existe na base").then(msg => {
                        msg.delete({timeout: deletarMensagemGeral});
                    }).catch(console.error);
                    return;
                }
            }
            if (args[1] === "-A") {
                idMvp = args[5];
                if (!listaMvp.get(idMvp)) {
                    msg.channel.send("MVP não existe na base").then(msg => {
                        msg.delete({timeout: deletarMensagemGeral});
                    }).catch(console.error);
                    return;
                }
            }
            listaMvp.getLista().get(idMvp).horaMinutoMorte = new Date("2020-01-" + args[2] + "T" + args[3] + ":00.000");
            listaMvp.getLista().get(idMvp).coordenadasTumulo = args[4];
            msg.channel.send("Horário adicionado com sucesso").then(msg => {
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
        msg.channel.send("Lista resetada").then(msg => {
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
        if (contagem === 0) msg.channel.send("Não existem horários cadastrados.").then(msg => {
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
        msg.author.send(new msgUtil(bot).help());
        return;
    }
});

/* *******************
* EASTER EGGS
* ***************** */
bot.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content === "safadinho") {
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
    if (msg.content === "o que a aesir mais gosta?") {
        msg.reply('Duwãfufaito!!!' + " " + new generalUtil(bot).emoji(properties.get('bot.message.emoji.aesirGosta01')) +
            " " + new generalUtil(bot).emoji(properties.get('bot.message.emoji.aesirGosta01')));
        return;
    }
    if (msg.content === "que preguiça") {
        msg.reply('Vai farmar fdp!!' + " " + new generalUtil(bot).emoji(properties.get('bot.message.emoji.preguica')));
        return;
    }
    if (msg.content === "me beija") {
        msg.reply('Awh!' + " " + new generalUtil(bot).emojis(properties.get('bot.message.emoji.meBeija')));
        return;
    }
    if (msg.content === "1%") {
        msg.channel.send("Oloko" + " " + msg.author.username + ', mas 1% é bom demais!'
            + " " + new generalUtil(bot).emoji(properties.get('bot.message.emoji.umPorcento')));
        return;
    }
    if (msg.content === "quantas bsb gastou?") {
        msg.reply('Fala 300... Fala 300...' + " " + new generalUtil(bot).emoji(properties.get('bot.message.emoji.quantasBsbGastou')));
        return;
    }
    if (msg.content === "300") {
        msg.reply('Um pouco mais...' + " " + new generalUtil(bot).emoji(properties.get('bot.message.emoji.trezendos')));
        return;
    }
});