class MsgUtil {

    bot;
    MessageAttachment;
    new;

    constructor(bot, MessageAttachment) {
        this.bot = bot;
        this.MessageAttachment = MessageAttachment;
    }

    help() {
        let emojiAesir = new generalUtil(this.bot).emoji("709546703132426322");
        let emojiMVP = new this.MessageAttachment('../images/ragnarok_gifs/MVP.png');
        return emojiAesir + " **DICIONÁRIO DE COMANDOS** " + emojiAesir + 
            "\n \n **Adicionar horário de um MVP**" + "- parâmetros de entrada: hora da morte, coordenadas, nome ou id" +
            "\n \n> %mvp -a *hh:mm* *x/y* *nome do mvp*" +
            "\n> %mvp -A *hh:mm* *x/y* *código do mvp*" +
            "\n \n **Pesquisar um MVP específico** - parâmetros de entrada: nome ou id" +
            "\n \n> %mvp -p *nome do mvp*" +
            "\n> %mvp -P *código do mvp*" +
            "\n \n**Comandos Gerais**" +
            "\n \n> %horarios **Lista todos Mvps informando Nome, Mapa, Horário de Respawn**" +
            "\n> %resetar  **Limpa a lista de horários dos Mvps**" +
            "\n> %aura     **Lista os MVPs com aura verde**";
    }

    aura() {
        return "\n**MVPS de Aura Verde**,\n" +
            "> ° Amon Ra - Pyramid F6 (entrada no meio do mapa)\n" +
            "> ° Amon Ra - Pyramid F6 (entrada no meio do mapa)\n" +
            "> ° Vesper - Juperos 3 (Quest)\n" +
            "> ° Atroce - Rachel desce| Rachel desce esq| Ice dun desce desce| Ice dun desce desce direita\n" +
            "> ° Bacsojin - Louyang dun 3\n" +
            "> ° Boitata - Brasilis dun 2\n" +
            "> ° Doppelganger - Gef dun 03\n" +
            "> ° Dracula - Gef dun 02\n" +
            "> ° Drake - Sunken Ship 2\n" +
            "> ° Venomous Chimera - Instances Heart Hunter War Base\n" +
            "> ° Eddga - Payon Direita Desce Direita\n" +
            "> ° Evil Snake Lord - Goryun Dun 3\n" +
            "> ° Baphomet - Hidden Dun 3\n" +
            "> ° Dark Lord - GH chyard\n" +
            "> ° R48-85-BESTIA - Rufus";
    }
}

module.exports = MsgUtil;