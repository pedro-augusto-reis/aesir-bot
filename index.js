// imports
cacete = require('./domain/listaMvp');
const {Client, MessageAttachment, RichEmbed} = require('discord.js');

// config bot
const bot = new Client();
bot.login("");
const prefix = '%';
var listaMvp;

//Aviso de bot online
bot.on('ready', () => {
    listaMvp = new cacete().retornaLista();
    console.log('O pau está DURASSO!');
});

/*
*******************
* EASTER EGGS
* *****************
* */
// respostas com imagem ou gif
bot.on('message', msg => {
    if (msg.author.bot) return
    let args = msg.content.substring(prefix.length).split(' ')
    if (!msg.content.startsWith(prefix)) return
    switch (args[0]) {
        case 'safadinho' :
            const attachment1 = new MessageAttachment('./gifs/safadinho.gif');
            msg.channel.send(attachment1);
            break;
        case 'acorda' :
            const attachment2 = new MessageAttachment('./gifs/acorda.gif');
            msg.channel.send(attachment2);
            break;
        case 'macaco' :
            const attachment3 = new MessageAttachment('./gifs/macaco.gif');
            msg.channel.send(attachment3);
            break;
        case 'sarrada' :
            const attachment4 = new MessageAttachment('./gifs/sarrada.gif');
            msg.channel.send(attachment4);
            break;
    }
});

bot.on('message', msg => {
    if (msg.author.bot) return
    if (msg.content === "O que a aesir mais gosta?") {
        msg.reply('Duwãfufaito!!!' + " " + emoji("709561477324865603") + " " + emoji("709555094227779624"));
    }
    if (msg.content === "Que preguiça") {
        msg.reply('Vai farmar fdp!!' + " " + emoji("709561478205931662"));
    }
    if (msg.content === "Me beija") {
        msg.reply('Awh!' + " " + emoji("709544168594341928"));
    }
    if (msg.content === "1%") {
        msg.channel.send("Oloko" + " " + msg.author.username + ', mas 1% é bom demais!' + " " + emoji("709561477165613114"));
    }
    if (msg.content === "Quantas bsb gastou?") {
        msg.reply('Fala 300... Fala 300...' + " " + emoji('709808464238477445'));
    }
    if (msg.content === "300") {
        msg.reply('Um pouco mais...' + " " + emoji('709808464414900324'));
    }
});

/*
*******************
* COMANDO CLEAR
* *****************
* */
bot.on('message', msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix) + "clear") return;
    let args = msg.content.substring(prefix.length).split(' ')
    if (msg.member.roles.cache.has('365245891449192449')) {
        if (!msg.content.startsWith(prefix)) return
        switch (args[0]) {
            case "clear" :
                if (!args[1]) return msg.reply('Quantas mensagens, seu burro?')
                if (args[1] > 20) {
                    msg.channel.bulkDelete(20)
                } else {
                    msg.channel.bulkDelete(args[1])
                }
        }
    } else {
        switch (args[0]) {
            case "clear" :
                msg.reply('tu é bobo, é?!')
        }
    }
});


/*
****************************
* LISTA MVPs COM AURA VERDE
* **************************
* */
bot.on('message', msg => {
    if (msg.author.bot) return
    let args = msg.content.substring(prefix.length).split(' ')
    if (!msg.content.startsWith(prefix)) return
    switch (args[0]) {
        case "aura" :
            msg.channel.send(" **MVPS de Aura Verde** " +
                "\n ° Amon Ra - Pyramid F6 (entrada no meio do mapa)" +
                "\n ° Vesper - Juperos 3 (Quest)" +
                "\n ° Atroce - Rachel desce| Rachel desce esq| Ice dun desce desce| Ice dun desce desce direita" +
                "\n ° Bacsojin - Louyang dun 3" +
                "\n ° Boitata - Brasilis dun 2" +
                "\n ° Doppelganger - Gef dun 03" +
                "\n ° Dracula - Gef dun 02" +
                "\n ° Drake - Sunken Ship 2" +
                "\n ° Venomous Chimera - Instances Heart Hunter War Base" +
                "\n ° Eddga - Payon Direita Desce Direita" +
                "\n ° Evil Snake Lord - Goryun Dun 3" +
                "\n ° Baphomet - Hidden Dun 3" +
                "\n ° Dark Lord - GH chyard" +
                "\n ° R48-85-BESTIA - Rufus")
            break;
    }
});

/*
*******************
* MVP TIME TRACKER
* *****************
* */
bot.on('message', (msg) => {

    // bot ignora mensagens dele mesmo e não aceita outros prefixos
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return
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
    const args = msg.content.slice(prefix.length).split(' ');

    // comandos com argumentos
    if (args.length > 1) {

        // pesquisar informações determinado MVP
        // %mvp -p CODE_MVP
        if (msg.content.startsWith(prefix) + "mvp" && args[1] === "-P") {
            if (!listaMvp.get(args[2])) {

            }
            msg.channel.send("Nome MVP: " + listaMvp.get(args[2]).nomeMvp +
                "\nMapa: " + listaMvp.get(args[2]).mapa +
                "\nRespawn: " + calcularRespawn(listaMvp.get(args[2]).horaMinutoMorte, listaMvp.get(args[2]).tempoDeRespawn) +
                "\nCoordenadas: " + listaMvp.get(args[2]).coordenadasTumulo, listaMvp.get(args[2]).imagem);
        }

        // pesquisar informações determinado MVP pelo Nome
        // %mvp -P NOME_MVP
        if (msg.content.startsWith(prefix) + "mvp" && args[1] === "-p") {
            idMvp = pesquisarMvpPorNome(construirNomeMvp(args, 2));
            if (!idMvp || idMvp === '') {
                msg.channel.send("Encontrei nada não com esse nome.");
                return;
            }
            msg.channel.send("Nome MVP: " + listaMvp.get(idMvp).nomeMvp +
                "\nMapa: " + listaMvp.get(idMvp).mapa +
                "\nRespawn: " + calcularRespawn(listaMvp.get(idMvp).horaMinutoMorte, listaMvp.get(idMvp).tempoDeRespawn) +
                "\nCoordenadas: " + listaMvp.get(idMvp).coordenadasTumulo, listaMvp.get(idMvp).imagem);
        }

        // incluir horário de determinado MVP utilizando CODIGO
        // %mvp -a HORARIO_MORTE COORDENADAS CODE_MVP
        if (msg.content.startsWith(prefix) + "mvp" && args[1] === "-A") {
            if (!/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/.test(args[2])) {
                msg.channel.send("O horário deve ser válido e no formato HH:mm");
                msg.channel.send("%mvp -a CODE_MVP HORARIO_MORTE COORDENADAS");
                return;
            }
            if (!/^\d{1,4}\/\d{1,4}$/.test(args[3])) {
                msg.channel.send("Informar uma coordenada válida xxxx/yyyy");
                msg.channel.send("%mvp -a CODE_MVP HORARIO_MORTE COORDENADAS");
            }
            listaMvp.get(args[4]).horaMinutoMorte = new Date("2020-01-01T" + args[2] + ":00.000");
            listaMvp.get(args[4]).coordenadasTumulo = args[3];
            msg.channel.send("Horário adicionado com sucesso");
        }

        // incluir horário de determinado MVP utilizando nome
        // %mvp -a HORARIO_MORTE COORDENADAS NOME_MVP
        if (msg.content.startsWith(prefix) + "mvp" && args[1] === "-a") {
            if (!/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/.test(args[2])) {
                msg.channel.send("O horário deve ser válido e no formato hh:mm");
                return;
            }
            if (!/^\d{1,4}\/\d{1,4}$/.test(args[3])) {
                msg.channel.send("A coordenada deve ser válida e no formato x/y");
            }
            idMvp = pesquisarMvpPorNome(construirNomeMvp(args, 4));
            if (!idMvp || idMvp === '') {
                msg.channel.send("Encontrei nada não com esse nome.");
                return;
            }
            listaMvp.get(idMvp).horaMinutoMorte = new Date("2020-01-01T" + args[2] + ":00.000");
            listaMvp.get(idMvp).coordenadasTumulo = args[3];
            msg.channel.send("Horário adicionado com sucesso");
        }
    }

    // comandos sem argumentos
    if (msg.content.startsWith(prefix + "resetar")) {
        listaMvp = new cacete().retornaLista();
        msg.channel.send("Lista resetada");
    }

    // lista todas as entradas
    if (msg.content.startsWith(prefix + "horarios")) {
        listaMvp.forEach(function (value, key) {
            if (value.horaMinutoMorte) {
                msg.channel.send(value.nomeMvp + "\n" +
                    "> Mapa: " + value.mapa + ", Respawn: " + calcularRespawn(value.horaMinutoMorte, value.tempoDeRespawn));
            }
        }, listaMvp);
    }

    // help
    if (msg.content.startsWith(prefix + "help")) {
        msg.author.send(
            "\n##########################################################\n" +
            "**                                                          DICIONÁRIO DE COMANDOS **\n" +
            "##########################################################\n" +
            "\n**Adicionar horário MVP** - parâmetros de entrada: hora morte, coordenadas, nome ou id\n" +
            "> %mvp -a hh:mm x/y nome-mvp\n" +
            "> %mvp -A hh:mm x/y código-mvp\n" +
            "\n**Pesquisar MVP específico** - parâmetros de entrada: nome ou id\n" +
            "> %mvp -p nome-mvp\n" +
            "> %mvp -P código-mvp\n" +
            "\n**Comandos Gerais**\n" +
            "> %resetar        Limpa a lista e todas as entradas dos Mvps\n" +
            "> %horarios      Lista todos Mvps, informando Nome, Mapa, Horário de Respawn\n" +
            "> %aura             MVPs com aura verde" +
            "\n\n##########################################################"
        );
    }
});

/* ***************************************/
// UTIL
/* ***************************************/

//emojis no discord
function emoji(id) {
    return bot.emojis.cache.get(id).toString();
}

function calcularRespawn(horaMorte, respawn) {
    if (!horaMorte) {
        return null;
    }
    let horaMorteTemp = new Date(horaMorte);

    horaMorteTemp.setMinutes(horaMorteTemp.getMinutes() + respawn);

    hora = horaMorteTemp.getHours();
    minuto = horaMorteTemp.getMinutes();

    if (horaMorteTemp.getHours() < 10) hora = "0" + hora;
    if (horaMorteTemp.getMinutes() < 10) minuto = "0" + minuto;

    return hora + ":" + minuto;
}

function construirNomeMvp(args, posicaoInicialNome) {
    let nomeMvp = '';
    for (i = posicaoInicialNome; i < args.length; i++) {
        nomeMvp = nomeMvp + args[i];
        nomeMvp = nomeMvp + ' ';
    }
    nomeMvp = nomeMvp.trim();
    return nomeMvp;
}

function pesquisarMvpPorNome(nomeMvp) {
    chave = 0;
    if (!nomeMvp || nomeMvp === "") {
        return chave;
    }
    nomeMvp = nomeMvp.trim().replace(/\s/g, '').toLowerCase();

    listaMvp.forEach(function (value, key) {
        if (value.nomeMvp.trim().replace(/\s/g, '').toLowerCase().includes(nomeMvp)) {
            chave = key;
        }
    }, listaMvp);
    return chave;
}
