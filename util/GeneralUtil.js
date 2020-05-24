class GeneralUtil{
    emojis(id) {
        return bot.emojis.cache.get(id).toString();
    }
}
module.exports = GeneralUtil;