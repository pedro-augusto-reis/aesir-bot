const {MessageAttachment} = require('discord.js');

mvp = require('./Mvp');
var mvpTrackerLista;

attachmentAmonRa = new MessageAttachment('./images/mvp_gifs/1511.gif');
attachmentAtroce = new MessageAttachment('./images/mvp_gifs/1785.gif');
attachmentWhiteLady = new MessageAttachment('./images/mvp_gifs/1630.gif');
attachmentBaphomet = new MessageAttachment('./images/mvp_gifs/1039.gif');
attachmentDoppel = new MessageAttachment('./images/mvp_gifs/1046.gif');
attachmentMistress = new MessageAttachment('./images/mvp_gifs/1059.gif');
attachmentGTB = new MessageAttachment('./images/mvp_gifs/1086.gif');
attachmentDrake = new MessageAttachment('./images/mvp_gifs/1112.gif');
attachmentEddga = new MessageAttachment('./images/mvp_gifs/1115.gif');
attachmentPharaoh = new MessageAttachment('./images/mvp_gifs/1157.gif');
attachmentGarm = new MessageAttachment('./images/mvp_gifs/1252.gif');
attachmentDarkLord = new MessageAttachment('./images/mvp_gifs/1272.gif');
attachmentDracula = new MessageAttachment('./images/mvp_gifs/1389.gif');
attachmentEvilSnake = new MessageAttachment('./images/mvp_gifs/1418.gif');
attachmentSamurai = new MessageAttachment('./images/mvp_gifs/1492.gif');
attachmentTaoGunka = new MessageAttachment('./images/mvp_gifs/1583.gif');
attachmentKiel = new MessageAttachment('./images/mvp_gifs/1734.gif');
attachmentGloom = new MessageAttachment('./images/mvp_gifs/1768.gif');
attachmentBishop = new MessageAttachment('./images/mvp_gifs/1871.gif');
attachmentBoitata = new MessageAttachment('./images/mvp_gifs/2068.gif');

class ListaMvp{

    constructor() {
        mvpTrackerLista = new Map();
        mvpTrackerLista.set("1511", new mvp(" **Amon Ra** ", null, "moc_pryd06", null,120,null, attachmentAmonRa));
        mvpTrackerLista.set("1785", new mvp(" **Atroce** ", null, "ve_fild02", null, 360, null, attachmentAtroce));
        mvpTrackerLista.set('1039', new mvp(' **Baphomet** ', null, 'prt_maze03', null, 120, null, attachmentBaphomet));
        mvpTrackerLista.set('2068', new mvp(' **Boitata** ', null, 'bra_dun02', null, 120, null, attachmentBoitata));
        mvpTrackerLista.set('1272', new mvp(' **Dark Lord** ', null, 'gl_chyard', null, 60, null, attachmentDarkLord));
        mvpTrackerLista.set('1046', new mvp(' **Doppelganger** ', null, 'gef_dun02', null, 120, null, attachmentDoppel));
        mvpTrackerLista.set('1389', new mvp(' **Dracula** ', null, 'gef_dun01', null, 60, null, attachmentDracula));
        mvpTrackerLista.set('1112', new mvp(' **Drake** ', null, 'treasure02', null, 120, null, attachmentDrake));
        mvpTrackerLista.set('1115', new mvp(' **Eddga** ', null, 'pay_fild10', null, 120, null, attachmentEddga));
        mvpTrackerLista.set('1418', new mvp(' **Evil Snake Lord** ', null, 'gon_dun03', null, 94, null, attachmentEvilSnake));
        mvpTrackerLista.set('1871', new mvp(' **Fallen Bishop** ', null, 'abbey02', null, 120, null, attachmentBishop));
        mvpTrackerLista.set('1252', new mvp(' **Garm** ', null, 'xmas_fild01', null, 120, null, attachmentGarm));
        mvpTrackerLista.set('1768', new mvp(' **Gloom** ', null, 'ra_san05', null, 300, null, attachmentGloom));
        mvpTrackerLista.set('1086', new mvp(' **GTB** ', null, 'prt_sewb4', null, 60, null, attachmentGTB));
        mvpTrackerLista.set('1734', new mvp(' **Kiel** ', null, 'kh_dun02', null, 120, null, attachmentKiel));
        mvpTrackerLista.set("1059", new mvp(" **Mistress** ", null, "mjolnir_05", null, 120, null, attachmentMistress));
        mvpTrackerLista.set('1157', new mvp(' **Pharaoh** ', null, 'in_sphinx5', null, 60, null, attachmentPharaoh));
        mvpTrackerLista.set('1492', new mvp(' **Samurai** ', null, 'ama_dun03', null, 91, null, attachmentSamurai));
        mvpTrackerLista.set('1583', new mvp(' **Tao Gunka** ', null, 'beach_dun', null, 300, null, attachmentTaoGunka));
        mvpTrackerLista.set("1630", new mvp(" **White Lady** ", null, "lou_dun03", null,117,null, attachmentWhiteLady));
    }

    retornaLista(){
        return mvpTrackerLista;
    }
}
module.exports = ListaMvp;