const {Client, MessageAttachment, RichEmbed} = require('discord.js');
const bot = new Client();
bot.login("");

//Prefixo do bot
const prefix = '%'
mvp = require('./domain/mvp');
var listaMvp;

//Aviso de online
bot.on('ready', () =>{
    gerarLista();
    console.log('O pau está DURASSO!');
})

// Lista de imagens de MVP

const attachmentAmonRa = new MessageAttachment( './MVP/1511.gif' )
const attachmentAtroce = new MessageAttachment( './MVP/1785.gif' )
const attachmentWhiteLady = new MessageAttachment( './MVP/1630.gif' )
const attachmentBaphomet = new MessageAttachment( './MVP/1039.gif' )
const attachmentDoppel = new MessageAttachment( './MVP/1046.gif' )
const attachmentMistress = new MessageAttachment( './MVP/1059.gif' )
const attachmentGTB = new MessageAttachment( './MVP/1086.gif' )
const attachmentDrake = new MessageAttachment( './MVP/1112.gif' )
const attachmentEddga = new MessageAttachment( './MVP/1115.gif' )
const attachmentPharaoh = new MessageAttachment( './MVP/1157.gif' )
const attachmentGarm = new MessageAttachment( './MVP/1252.gif' )
const attachmentDarkLord = new MessageAttachment( './MVP/1272.gif' )
const attachmentDracula = new MessageAttachment( './MVP/1389.gif' )
const attachmentEvilSnake = new MessageAttachment( './MVP/1418.gif' )
const attachmentSamurai = new MessageAttachment( './MVP/1492.gif' )
const attachmentTaoGunka = new MessageAttachment( './MVP/1583.gif' )
const attachmentKiel = new MessageAttachment( './MVP/1734.gif' )
const attachmentGloom = new MessageAttachment( './MVP/1768.gif' )
const attachmentBishop = new MessageAttachment( './MVP/1871.gif' )
const attachmentBoitata = new MessageAttachment( './MVP/2068.gif' )

//emojis no discord

function emoji (id) {
    return bot.emojis.cache.get(id).toString();
}

//Respostas em msg de texto
bot.on('message', msg=>{
    if (msg.author.bot) return
    if(msg.content === "O que a aesir mais gosta?"){
        msg.reply('Duwãfufaito!!!' + " " + emoji( "709561477324865603" ) + " " + emoji( "709555094227779624" ) );
    }
    if(msg.content === "Que preguiça"){
        msg.reply('Vai farmar fdp!!' + " " + emoji( "709561478205931662" ));
    }
    if(msg.content === "Me beija"){
        msg.reply('Awh!' + " " + emoji( "709544168594341928" ));
    }
    if(msg.content === "1%"){
        msg.channel.send("Oloko" + " " + msg.author.username + ', mas 1% é bom demais!' + " " + emoji( "709561477165613114" ) );
    }
    if(msg.content === "Quantas bsb gastou?"){
        msg.reply('Fala 300... Fala 300...' + " " + emoji( '709808464238477445' ));
    }
    if(msg.content === "300"){
        msg.reply('Um pouco mais...' + " " + emoji( '709808464414900324' ) );
    }
})

//Comando clear
bot.on('message', msg=>{
    if (msg.author.bot) return
    let args = msg.content.substring(prefix.length).split(' ')
    if (msg.member.roles.cache.has('365245891449192449')){
        if(!msg.content.startsWith(prefix)) return
        switch(args[0]){
            case "clear" :
                if(!args[1]) return msg.reply('Quantas mensagens, seu burro?')
                if(args[1] > 20){
                    msg.channel.bulkDelete(20)
                } else{
                    msg.channel.bulkDelete(args[1])
                }
        }
    } else{
        switch(args[0]){
            case "clear" :
                msg.reply('tu é bobo, é?!')};
    }
})


//Respostas com imagem ou gif
bot.on('message', msg=>{
    if (msg.author.bot) return
    let args = msg.content.substring(prefix.length).split(' ')
    if(!msg.content.startsWith(prefix)) return
    switch(args[0]){
        case 'safadinho' :
            const attachment1 = new MessageAttachment( './gifs/safadinho.gif' );
            msg.channel.send(attachment1); break;
        case 'acorda' :
            const attachment2 = new MessageAttachment( './gifs/acorda.gif' );
            msg.channel.send(attachment2); break;
        case 'macaco' :
            const attachment3 = new MessageAttachment( './gifs/macaco.gif' );
            msg.channel.send(attachment3); break;
        case 'sarrada' :
            const attachment4 = new MessageAttachment( './gifs/sarrada.gif' );
            msg.channel.send(attachment4); break;
    }
})

//Lista de MVPs de Aura Verde
bot.on('message', msg=>{
    if (msg.author.bot) return
    let args = msg.content.substring(prefix.length).split(' ')
    if(!msg.content.startsWith(prefix)) return
    switch(args[0]){
        case "lista" :
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
})

//Timer de MVP

bot.on('message', (msg) => {

    // bot ignora mensagens dele mesmo e não aceita outros prefixos
    if (msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return
    // argumentos
    /*
    * exemplo
    * %mvp -a CODE_MVP HORARIO_MORTE COORDENADAS
    * args[0] = mvp
    * args[1] = -a
    * args[2] = CODE_MVP
    * args[3] = HORARIO_MORTE
    * args[4] = COORDENADAS
    * */
    const args = msg.content.slice(prefix.length).split(' ');

    // comandos com argumentos
    if(args.length > 1){

        // pesquisar informações determinado MVP
        // %mvp -p CODE_MVP
        if(msg.content.startsWith(prefix) + "mvp" && args[1] === "-p"){
            msg.channel.send("Nome MVP: " + listaMvp.get(args[2]).nomeMvp +
                "\nMapa: " + listaMvp.get(args[2]).mapa +
                "\nRespawn: " + calcularRespawn(listaMvp.get(args[2]).horaMinutoMorte,listaMvp.get(args[2]).tempoDeRespawn) +
                "\nCoordenadas: " + listaMvp.get(args[2]).coordenadasTumulo, listaMvp.get(args[2]).imagem);
        }

        // pesquisar informações determinado MVP pelo Nome
        // %mvp -P NOME_MVP
        if(msg.content.startsWith(prefix) + "mvp" && args[1] === "-P"){
            construirNomeMvp(args);
            idMvp = pesquisarMvpPorNome(args[2]);
            if(!idMvp || idMvp === ''){
                msg.channel.send("Escreve o nome do MVP direito porra!");
                return;
            }
            msg.channel.send("Nome MVP: " + listaMvp.get(idMvp).nomeMvp +
                "\nMapa: " + listaMvp.get(idMvp).mapa +
                "\nRespawn: " + calcularRespawn(listaMvp.get(idMvp).horaMinutoMorte,listaMvp.get(idMvp).tempoDeRespawn) +
                "\nCoordenadas: " + listaMvp.get(idMvp).coordenadasTumulo, listaMvp.get(idMvp).imagem);
        }

        // incluir horário de determinado MVP
        // %mvp -a CODE_MVP HORARIO_MORTE COORDENADAS
        if(msg.content.startsWith(prefix) + "mvp" && args[1] === "-a"){
            if(!/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/.test(args[3])){
                msg.channel.send("O horário deve ser válido e no formato HH:mm");
                msg.channel.send("%mvp -a CODE_MVP HORARIO_MORTE COORDENADAS");
                return;
            }
            if(!/^\d{1,4}\/\d{1,4}$/.test(args[4])){
                msg.channel.send("Informar uma coordenada válida xxxx/yyyy");
                msg.channel.send("%mvp -a CODE_MVP HORARIO_MORTE COORDENADAS");
            }
            listaMvp.get(args[2]).horaMinutoMorte = new Date("2020-01-01T"+args[3]+":00.000");
            listaMvp.get(args[2]).coordenadasTumulo = args[4];
            msg.channel.send("Horário adicionado com sucesso");
        }
    }

    // comandos sem argumentos
    if(msg.content.startsWith(prefix + "resetar")){
        gerarLista();
        msg.channel.send("Lista resetada");
    }

    // lista todas as entradas
    if(msg.content.startsWith(prefix + "horarios")){
        listaMvp.forEach(function(value, key) {
            // msg.channel.send(value.nomeMvp + " - " + value.mapa + " - respawn: " + value.horaMinutoRespawn);
            msg.channel.send(value.nomeMvp + "\n" +
                "> Mapa: " + value.mapa + ", Respawn: " + calcularRespawn(value.horaMinutoMorte,value.tempoDeRespawn));
        }, listaMvp);
    }


    if(msg.content.startsWith(prefix + "help")){
        msg.reply("Comandos com argumentos\n" +
            "> %mvp -a COD_MVP HORARIO_MORTE COORD_TUMULO\n" +
            "> %mvp -p COD_MVP   Pesquisa informações de determinado Mvp\n" +
            "Comandos sem argumentos\n" +
            "> %resetar          Limpa a lista e todas as entradas dos Mvps\n" +
            "> %horarios           Lista todos Mvps, informando Nome, Mapa, Horário de Respawn");
    }
});

/* ***************************************/
// UTIL
/* ***************************************/
function calcularRespawn(horaMorte, respawn){
    if(!horaMorte){
        return "00:00";
    }
    horaMorte.setMinutes(horaMorte.getMinutes() + respawn);

    hora = horaMorte.getHours();
    minuto = horaMorte.getMinutes();

    if(horaMorte.getHours() < 10) hora = "0" + hora;
    if(horaMorte.getMinutes() < 10) minuto = "0" + minuto;

    return hora + ":" + minuto;
}

function construirNomeMvp(args){
    let nomeMvp = '';
    for(i = 2; i < args.length; i++){
        nomeMvp = nomeMvp + args[i];
        nomeMvp = nomeMvp + ' ';
    }
    nomeMvp = nomeMvp.trim();
}

function pesquisarMvpPorNome(nomeMvp){
    chave = 0;
    if(!nomeMvp || nomeMvp === ""){
        return chave;
    }
    nomeMvp = nomeMvp.trim().replace(/\s/g, '').toLowerCase();

    listaMvp.forEach(function(value, key) {
        if(value.nomeMvp.trim().replace(/\s/g, '').toLowerCase().includes(nomeMvp)){
            chave = key;
        }
    }, listaMvp);
    return chave;
}

// gerar nova lista
function gerarLista() {
    listaMvp = new Map();
    listaMvp.set("1511", new mvp(" **Amon Ra** ", null, "moc_pryd06", null,120,null, attachmentAmonRa));
    listaMvp.set("1785", new mvp(" **Atroce** ", null, "ve_fild02", null, 360, null, attachmentAtroce));
    listaMvp.set('1039', new mvp(' **Baphomet** ', null, 'prt_maze03', null, 120, null, attachmentBaphomet));
    listaMvp.set('2068', new mvp(' **Boitata** ', null, 'bra_dun02', null, 120, null, attachmentBoitata));
    listaMvp.set('1272', new mvp(' **Dark Lord** ', null, 'gl_chyard', null, 60, null, attachmentDarkLord));
    listaMvp.set('1046', new mvp(' **Doppelganger** ', null, 'gef_dun02', null, 120, null, attachmentDoppel));
    listaMvp.set('1389', new mvp(' **Dracula** ', null, 'gef_dun01', null, 60, null, attachmentDracula));
    listaMvp.set('1112', new mvp(' **Drake** ', null, 'treasure02', null, 120, null, attachmentDrake));
    listaMvp.set('1115', new mvp(' **Eddga** ', null, 'pay_fild10', null, 120, null, attachmentEddga));
    listaMvp.set('1418', new mvp(' **Evil Snake Lord** ', null, 'gon_dun03', null, 94, null, attachmentEvilSnake));
    listaMvp.set('1871', new mvp(' **Fallen Bishop** ', null, 'abbey02', null, 120, null, attachmentBishop));
    listaMvp.set('1252', new mvp(' **Garm** ', null, 'xmas_fild01', null, 120, null, attachmentGarm));
    listaMvp.set('1768', new mvp(' **Gloom** ', null, 'ra_san05', null, 300, null, attachmentGloom));
    listaMvp.set('1086', new mvp(' **GTB** ', null, 'prt_sewb4', null, 60, null, attachmentGTB));
    listaMvp.set('1734', new mvp(' **Kiel** ', null, 'kh_dun02', null, 120, null, attachmentKiel));
    listaMvp.set("1059", new mvp(" **Mistress** ", null, "mjolnir_05", null, 120, null, attachmentMistress));
    listaMvp.set('1157', new mvp(' **Pharaoh** ', null, 'in_sphinx5', null, 60, null, attachmentPharaoh));
    listaMvp.set('1492', new mvp(' **Samurai** ', null, 'ama_dun03', null, 91, null, attachmentSamurai));
    listaMvp.set('1583', new mvp(' **Tao Gunka** ', null, 'beach_dun', null, 300, null, attachmentTaoGunka));
    listaMvp.set("1630", new mvp(" **White Lady** ", null, "lou_dun03", null,117,null, attachmentWhiteLady));

}