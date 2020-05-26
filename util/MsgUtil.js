class MsgUtil {

    bot;
    MessageAttachment;
    
    constructor(bot, MessageAttachment) {
        this.bot = bot;
        this.MessageAttachment = MessageAttachment;
        
    }

    helpMsg = {
        color: 0x7ac2fe,
        title: 'Dicionário de Comandos',
        url: 'https://github.com/pedro-augusto-reis/aesir-bot/blob/master/README.md',
        description: '**Parâmetros de Entrada**' +
        "\n**°Dia da morte:** *dd (necessita ter dois algarismos)*"+ 
        "\n**°Hora da morte:** *hh:mm*"+
        "\n**°Coordenadas:** *x/y*"+
        "\n***°Nome ou id***" + 
        '\n***°Exemplos estão disponíveis clickando no título desse dicionário***',
        thumbnail: {
            url: 'attachment://MVP.png'
        },
        fields: [
            { 
            name: '**Adicionar horário de um MVP**',
            value: '**%mvp -a **dd** *hh:mm* *x/y* *nome do MVP* \n\n %mvp -A **dd** *hh:mm* *x/y* *código do MVP***',
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
            url: 'attachment://help.gif',
        },
        footer: {
            text: 'Tutz e Yaerius',
            icon_url: 'https://i.imgur.com/SfzjpJI.png',
        }
    }
        

    help() {
        return this.helpMsg
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