class GeneralUtil{
    emoji(id) {
        return bot.emojis.cache.get(id).toString();
    }
}
module.exports = GeneralUtil;