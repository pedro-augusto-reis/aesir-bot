class MvpTrackerUtil{

    calcularRespawn(horaMorte, respawn){
        if (!horaMorte) {
            return null;
        }
        let horaMorteTemp = new Date(horaMorte);

        horaMorteTemp.setMinutes(horaMorteTemp.getMinutes() + respawn);

        return horaMorteTemp;
    }

    converterHoraParaString(horaMorteTemp){
        if(!horaMorteTemp){
            return null;
        }
        let hora = horaMorteTemp.getHours();
        let minuto = horaMorteTemp.getMinutes();

        if (horaMorteTemp.getHours() < 10) hora = "0" + hora;
        if (horaMorteTemp.getMinutes() < 10) minuto = "0" + minuto;

        return hora + ":" + minuto;
    }

    construirNomeMvp(args, posicaoInicialNome) {
        let nomeMvp = '';
        for (let i = posicaoInicialNome; i < args.length; i++) {
            nomeMvp = nomeMvp + args[i];
            nomeMvp = nomeMvp + ' ';
        }
        nomeMvp = nomeMvp.trim();
        return nomeMvp;
    }

    pesquisarMvpPorNome(nomeMvp, listaMvp) {
        let chave = 0;
        if (!nomeMvp || nomeMvp === "") {
            return chave;
        }
        nomeMvp = nomeMvp.trim().replace(/\s/g, '').toLowerCase();

        listaMvp.forEach(function (value, key) {
            if (value.nomeMvp.trim().replace(/\s/g, '').toLowerCase().includes(nomeMvp)) {
                chave = key;
            }
        }, listaMvp);
        return chave;
    }
}
module.exports = MvpTrackerUtil;