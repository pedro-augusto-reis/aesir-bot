/*
* by: Clan AesirBR
* Developers: Tutz, Yaerius
* v. 1.0
* ~~~ A zoeira não tem limites ~~~
*
* TODO:
*  1. (FEITO no Help e Aura, mas não está ideal) gerar arquivos com mensagens e remover do index.js (por exemplo as informções do comando %help);
*  2. Gerar timer multithread para informar quando o respawn acontecer no channel;
*  3. Refatorar as entradas para uma camada de serviço, separando o "controlador" de entrada da funcionalidade;
*  3.1. O arquivo index.js irá possuir apenas os camandos de entradas, dentro deverá ter apenas a chamada de uma função, implementando um facade;
* */

// imports
const {Client, MessageAttachment, RichEmbed, Discord} = require('discord.js');
listaInit = require('./domain/MvpTrackerLista');
mvpTrackerUtil = require('./util/MvpTrackerUtil');
generalUtil = require('./util/GeneralUtil');
msgUtil = require('./util/MsgUtil');
var propertiesReader = require('properties-reader');

// carregar arquivos propriedades
var properties = propertiesReader('properties');

// config bot
const bot = new Client();
bot.login(properties.get('bot.token'));
const prefix = '%';
var listaMvp;
const fs = require('fs')

// carregar bot
bot.on('ready', () => {
    listaMvp = new listaInit().retornaLista();
    console.log('O pau está DURASSO!');
});

// comandos bot
bot.on('message', (msg) => {

    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).split(' ');

    /*
    *******************
    * CLEAR
    * *****************
    */
    if (msg.content.startsWith(prefix + "clear")) {

        // comando clear
        if (msg.member.roles.cache.has('365245891449192449')) {
            if (!args[1]) return msg.reply('Quantas mensagens, seu burro? ' + new generalUtil(bot).emoji( "709544275842564126" ));
            (args[1] > 20) ? msg.channel.bulkDelete(20) : msg.channel.bulkDelete(args[1]);
        } else {
            msg.reply('tu é bobo, é?! ' + new generalUtil(bot).emoji( "709808465123475477" ))
        }
    }


    /*
    *******************
    * MVP TRACKER
    * *****************
    */

    // argumentos
    /*
    * exemplo
    * %mvp -A CODE_MVP HORARIO_MORTE COORDENADAS
    * args[0] = mvp
    * args[1] = -a
    * args[2] = CODE_MVP
    * args[3] = HORARIO_MORTE
    * args[4] = COORDENADAS
    * */

    /*
    * comandos com argumentos
    */
    if (args.length > 1) {

        // pesquisar informações determinado MVP
        // %mvp -P CODE_MVP
        if (msg.content.startsWith(prefix) + "mvp" && args[1] === "-P") {
            if (!listaMvp.get(args[2])) return;
            msg.channel.send("Nome MVP: " + listaMvp.get(args[2]).nomeMvp +
                "\nMapa: " + listaMvp.get(args[2]).mapa +
                "\nRespawn: " + new mvpTrackerUtil().calcularRespawn(listaMvp.get(args[2]).horaMinutoMorte, listaMvp.get(args[2]).tempoDeRespawn) +
                "\nCoordenadas: " + listaMvp.get(args[2]).coordenadasTumulo, listaMvp.get(args[2]).imagem);
        }

        // pesquisar informações determinado MVP pelo Nome
        // %mvp -p NOME_MVP
        if (msg.content.startsWith(prefix) + "mvp" && args[1] === "-p") {
            idMvp = new mvpTrackerUtil().pesquisarMvpPorNome(new mvpTrackerUtil().construirNomeMvp(args, 2), listaMvp);
            if (!idMvp || idMvp === '') {
                msg.channel.send("Não encontrei nada com esse nome. " + new generalUtil(bot).emoji("714561399816192081"));
                return;
            }
            msg.channel.send("Nome MVP: " + listaMvp.get(idMvp).nomeMvp +
                "\nMapa: " + listaMvp.get(idMvp).mapa +
                "\nRespawn: " + new mvpTrackerUtil().calcularRespawn(listaMvp.get(idMvp).horaMinutoMorte, listaMvp.get(idMvp).tempoDeRespawn) +
                "\nCoordenadas: " + listaMvp.get(idMvp).coordenadasTumulo, listaMvp.get(idMvp).imagem);
        }

        // incluir horário de determinado MVP utilizando CODIGO
        // %mvp -a HORARIO_MORTE COORDENADAS CODE_MVP
        if (msg.content.startsWith(prefix) + "mvp" && args[1] === "-A") {
            if (!/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/.test(args[2])) {
                msg.channel.send("O horário deve ser válido e no formato hh:mm");
                msg.channel.send("%mvp -a CODE_MVP HORARIO_MORTE COORDENADAS");
                return;
            }
            if (!/^\d{1,4}\/\d{1,4}$/.test(args[3])) {
                msg.channel.send("Informar uma coordenada válida xxx/yyy");
                msg.channel.send("%mvp -a CODE_MVP HORARIO_MORTE COORDENADAS");
            }
            listaMvp.get(args[4]).horaMinutoMorte = new Date("2020-01-01T" + args[2] + ":00.000");
            listaMvp.get(args[4]).coordenadasTumulo = args[3];
            msg.channel.send("Horário adicionado com sucesso " + new generalUtil(bot).emoji("709554709853372459"));
        }

        // incluir horário de determinado MVP utilizando nome
        // %mvp -a HORARIO_MORTE COORDENADAS NOME_MVP
        if (msg.content.startsWith(prefix) + "mvp" && args[1] === "-a") {
            if (!/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/.test(args[2])) {
                msg.channel.send("O horário deve ser válido e no formato hh:mm");
                return;
            }
            if (!/^\d{1,4}\/\d{1,4}$/.test(args[3])) {
                msg.channel.send("A coordenada deve ser válida e no formato xxx/yyy");
            }
            idMvp = new mvpTrackerUtil().pesquisarMvpPorNome(new mvpTrackerUtil().construirNomeMvp(args, 4), listaMvp);
            if (!idMvp || idMvp === '') {
                msg.channel.send("Não encontrei nada com esse nome. " + new generalUtil(bot).emoji("714561399816192081"));
                return;
            }
            listaMvp.get(idMvp).horaMinutoMorte = new Date("2020-01-01T" + args[2] + ":00.000");
            listaMvp.get(idMvp).coordenadasTumulo = args[3];
            msg.channel.send("Horário adicionado com sucesso. " + new generalUtil(bot).emoji("709554709853372459"));
        }
    }

    /* **********************
    * comandos sem argumentos
    * **********************/
    if (msg.content.startsWith(prefix + "resetar")) {
        listaMvp = new cacete().retornaLista();
        msg.channel.send("Lista resetada " + new generalUtil(bot).emoji("709554743109877760"));
    }   

    // lista todas as entradas ( Comando %horario )
    if (msg.content.startsWith(prefix + "horarios")) {
        let contagem = 0;

        listaMvp.forEach(function (value, key) {
            if (value.horaMinutoMorte) {
                contagem++;
                msg.channel.send(value.nomeMvp + "\n" +
                    "> Mapa: " + value.mapa + ", Respawn: " + new mvpTrackerUtil().calcularRespawn(value.horaMinutoMorte, value.tempoDeRespawn));
            }
        }, listaMvp);
        if (contagem === 0) msg.channel.send("Não existem horários cadastrados. " + new generalUtil(bot).emoji("709554981916639282"));
    }

    if (msg.content.startsWith(prefix + "aura")) {
        msg.reply(new msgUtil(bot).aura());
    }

    if (msg.content.startsWith(prefix + "help")) {
        msg.channel.send(new msgUtil(bot).help())
    }
});

/*
*******************
* EASTER EGGS
* *****************
*/
bot.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content === "safadinho") {
        const attachment1 = new MessageAttachment('./images/aesir_gifs/safadinho.gif');
        msg.channel.send(attachment1);
    }
    if (msg.content === "acorda") {
        const attachment2 = new MessageAttachment('./images/aesir_gifs/acorda.gif');
        msg.channel.send(attachment2);
    }
    if (msg.content === "macaco") {
        const attachment3 = new MessageAttachment('./images/aesir_gifs/macaco.gif');
        msg.channel.send(attachment3);
    }
    if (msg.content === "sarrada") {
        const attachment4 = new MessageAttachment('./images/aesir_gifs/sarrada.gif');
        msg.channel.send(attachment4);
    }
});

bot.on('message', msg => {
    if (msg.content === "testando") {
        msg.reply(new msgUtil(bot).aura());
    }
    if (msg.content === "o que a aesir mais gosta?") {
        msg.reply('Duwãfufaito!!!' + " " + new generalUtil(bot).emoji("709561477324865603") + " " + new generalUtil(bot).emoji("709555094227779624"));
    }
    if (msg.content === "que preguiça") {
        msg.reply('Vai farmar fdp!!' + " " + new generalUtil(bot).emoji("709561478205931662"));
    }
    if (msg.content === "me beija") {
        msg.reply('Awh!' + " " + new generalUtil(bot).emoji( "709544168594341928" ));
    }
    if (msg.content === "1%") {
        msg.channel.send("Oloko" + " " + msg.author.username + ', mas 1% é bom demais!' + " " + new generalUtil(bot).emoji("709561477165613114"));
    }
    if (msg.content === "quantas bsb gastou?") {
        msg.reply('Fala 300... Fala 300...' + " " + new generalUtil(bot).emoji('709808464238477445'));
    }
    if (msg.content === "300") {
        msg.reply('Um pouco mais...' + " " + new generalUtil(bot).emoji('709808464414900324'));
    }
});



const exampleEmbed = {
	color: 0x7ac2fe,
    title: 'Dicionário de Comandos',
    url: 'https://github.com/pedro-augusto-reis/aesir-bot/blob/master/README.md',
    description: '**Parâmetros de Entrada**' + 
    "\n**Hora da morte:** hh:mm"+
    "\n**Coordenadas:** x/y"+
    "\n**Nome ou id**" + 
    '\n**Exemplos estão disponíveis clickando no título desse dicionário**',
	thumbnail: {
        url: 'attachment://MVP.png'
    },
	fields: [
        { 
        name: '**Adicionar horário de um MVP**',
        value: '**%mvp -a *hh:mm* *x/y* *nome do MVP* \n\n %mvp -A *hh:mm* *x/y* *código do MVP***',
        inline: false,
        },
        { 
        name: '**Pesquisar um MVP específico**',
        value: '**%mvp -p *nome do MVP* \n\n %mvp -P *código do MVP***',
        inline: false,
        },
		{
        name: '**Lista todos MVPs informando Nome, Mapa, Horário de Respawn**',
        value: '**%horarios**',
        inline: false,
        },
		{
        name: '**Limpa a lista de horários dos MVPs**',
        value: '**%resetar**',
        inline: false,
        },
        {
        name: '**Lista os MVPs com aura verde**',
        value: '**%aura**',
        inline: false,
        },
    ],
	image: {
        url: 'attachment://omg.gif',
    },
	footer: {
        text: 'Tutz e Yaerius',
        icon_url: 'https://i.imgur.com/SfzjpJI.png',
    }
}
    
bot.on('message', msg => {
    if (msg.content === "%teste") {
        msg.channel.send({
            embed: exampleEmbed,
            files: [{
                attachment: 'images/ragnarok_gifs/MVP.png',
                name: 'MVP.png'
            },
            {
                attachment: 'images/ragnarok_gifs/Omg.gif',
                name: 'omg.gif'
            }]
        });
    }
});