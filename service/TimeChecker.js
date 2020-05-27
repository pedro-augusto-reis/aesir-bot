const index = require('../index');
const mvpTrackerUtil = require('../util/MvpTrackerUtil');
const propertiesReader = require('properties-reader');

// carregar arquivos propriedades
const properties = propertiesReader('properties');
const intervaloTempoAviso = properties.get('bot.time.checker.intervalo');
const tempoLimparMvp = properties.get('bot.time.checker.limpar.mvp');
const ajustarValorIdCanal = properties.get('bot.id.canal.monitoramento.mvp').replace(/'/g, '').trim();
const deletarMensagemTracker = properties.get('bot.message.delete.tracker');

class TimeChecker {

    mvpRespawnChecker(bot) {
        setInterval(function () {

            let horaAtual = new Date();
            let horaRespawnMvp = new Date();

            console.log(horaAtual);

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

                    if (horaAtual.getTime() === horarioInicial.getTime()) {
                        bot.channels.cache.get(ajustarValorIdCanal).send("\n**Vai matar o MVP, arrombado! Ele vai nascer em** " + intervaloTempoAviso + " **minuto(s).**" +
                            "\nNome: " + value.nomeMvp +
                            "\nMapa: " + value.mapa +
                            "\n**Coordenada do túmulo:** /navi "+ value.mapa + " " + value.coordenadasTumulo, value.imagem).then(msg => {
                            msg.delete({timeout: deletarMensagemTracker});
                        }).catch(console.error);
                    }

                    if (horaAtual.getTime() === horaRespawnMvp.getTime()) {
                        bot.channels.cache.get(ajustarValorIdCanal).send("\n**Anda logo caralho!! Vai matar o MVP! Ele está para nascer.**" +
                            "\nNome: " + value.nomeMvp +
                            "\nMapa: " + value.mapa +
                            "\n**Coordenada do túmulo:** /navi "+ value.mapa + " " + value.coordenadasTumulo, value.imagem).then(msg => {
                            msg.delete({timeout: deletarMensagemTracker});
                        }).catch(console.error);
                    }

                    if (horaAtual.getTime() === horarioFinal.getTime()) {
                        bot.channels.cache.get(ajustarValorIdCanal).send("\n**Já deve ter nascido o MVP! Vai logo matar essa merda.**" +
                            "\nNome: " + value.nomeMvp +
                            "\nMapa: " + value.mapa +
                            "\n**Coordenada do túmulo:** /navi "+ value.mapa + " " + value.coordenadasTumulo, value.imagem).then(msg => {
                            msg.delete({timeout: deletarMensagemTracker});
                        }).catch(console.error);
                    }

                    if (horaAtual.getTime() === horarioLimparMvp.getTime()) {
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