class MsgUtil {

    bot;

    constructor(bot) {
        this.bot = bot;
        console.log(this.bot.emojis);
    }

    help() {
        let emojiAesir = new generalUtil(this.bot).emoji("709546703132426322");
        return "\n" + emojiAesir + " **DICIONÁRIO DE COMANDOS** " + emojiAesir +
            "\n**Adicionar horário MVP** - parâmetros de entrada: hora morte, coordenadas, nome ou id" +
            "\n> %mvp -a hh:mm x/y nome-mvp" +
            "\n> %mvp -A hh:mm x/y código-mvp" +
            "\n**Pesquisar MVP específico** - parâmetros de entrada: nome ou id" +
            "\n> %mvp -p nome-mvp" +
            "\n> %mvp -P código-mvp" +
            "\n**Comandos Gerais**" +
            "\n> %resetar  Limpa a lista e todas as entradas dos Mvps" +
            "\n> %horarios Lista todos Mvps, informando Nome, Mapa, Horário de Respawn" +
            "\n> %aura     MVPs com aura verde";
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