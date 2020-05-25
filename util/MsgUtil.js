
generalUtil = require('./GeneralUtil');

class MsgUtil{

    bot;
    constructor(bot) {
        this.bot = bot;    
    }

    
    aura(){
        return "oi" + new generalUtil(this.bot).emoji( "714210576061956151" );
    }
    


}
module.exports = MsgUtil;