const index = require('../index');
const mvpTrackerUtil = require('../util/MvpTrackerUtil');
const propertiesReader = require('properties-reader');

// carregar arquivos propriedades
const properties = propertiesReader('properties');
const intervaloTempoAviso = properties.get('bot.time.checker.intervalo');
const tempoLimparMvp = properties.get('bot.time.checker.limpar.mvp');
const ajustarValorIdCanal = properties.get('bot.id.canal.monitoramento.mvp').replace(/'/g, '').trim();

class TimeChecker {

    mvpRespawnChecker(bot) {
        setInterval(function () {

            let horaAtual = new Date();
            let horaRespawnMvp = new Date();

            index.listaMvp.getLista().forEach(function (value, key) {
                if (value.horaMinutoMorte) {

                    let horaRespawnMvpTmp = new mvpTrackerUtil().calcularRespawn(value.horaMinutoMorte, value.tempoDeRespawn);
                    horaRespawnMvp.setHours(horaRespawnMvpTmp.getHours());
                    horaRespawnMvp.setMinutes(horaRespawnMvpTmp.getMinutes());

                    let horarioInicial = new Date(horaRespawnMvp);
                    let horarioFinal = new Date(horaRespawnMvp);
                    let horarioLimparMvp = new Date(horaRespawnMvp);
                    horarioInicial.setMinutes(horarioInicial.getMinutes() - intervaloTempoAviso);
                    horarioFinal.setMinutes(horarioFinal.getMinutes() + intervaloTempoAviso);
                    horarioLimparMvp.setMinutes(horarioFinal.getMinutes() + tempoLimparMvp);

                    if(horaAtual.getTime() === horarioInicial.getTime()){
                        bot.channels.cache.get(ajustarValorIdCanal).send("\nVai matar o MVP vagabundo! Ele vai nascer em " + intervaloTempoAviso + " minuto(s)." +
                            "\nNome: " + value.nomeMvp +
                            "\nMapa: " + value.mapa +
                            "\nCoordenada do túmulo: " + value.coordenadasTumulo, value.imagem);
                    }

                    if(horaAtual.getTime() === horaRespawnMvp.getTime()){
                        bot.channels.cache.get(ajustarValorIdCanal).send("\nVai matar o MVP! Ele está para nascer." +
                            "\nNome: " + value.nomeMvp +
                            "\nMapa: " + value.mapa +
                            "\nCoordenada do túmulo: " + value.coordenadasTumulo, value.imagem);
                    }

                    if(horaAtual.getTime() === horarioFinal.getTime()){
                        bot.channels.cache.get(ajustarValorIdCanal).send("\nVai matar o MVP! Se ninguém tiver matado é teu." +
                            "\nNome: " + value.nomeMvp +
                            "\nMapa: " + value.mapa +
                            "\nCoordenada do túmulo: " + value.coordenadasTumulo, value.imagem);
                    }

                    if(horaAtual.getTime() === horarioLimparMvp.getTime()){
                        index.listaMvp.getLista().get(key).coordenadasTumulo = null;
                        index.listaMvp.getLista().get(key).horaMinutoMorte = null;
                        index.listaMvp.getLista().get(key).diaMorte = null;
                    }
                }
            }, index.listaMvp.getLista());
        }, 60 * 1000);
    }
}
module.exports = TimeChecker;