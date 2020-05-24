class GeneralUtil{

    bot;

    constructor(bot) {
        this.bot = bot;
    }

    emoji(id) {
        try{
            return this.bot.emojis.cache.get(id).toString();
        }catch(ex){
            return "Emoji não encontrado.";
        }
    }
}
module.exports = GeneralUtil;