class Mvp{

    nomeMvp;
    diaMorte;
    horaMinutoMorte;
    mapa;
    coordenadasTumulo;
    tempoDeRespawn;
    informacoesExtras;
    imagem;

    constructor(nomeMvp, diaMorte, horaMinutoMorte, mapa, coordenadasTumulo, tempoDeRespawn, informacoesExtras, imagem) {
        this.nomeMvp = nomeMvp;
        this.diaMorte = diaMorte;
        this.horaMinutoMorte = horaMinutoMorte;
        this.mapa = mapa;
        this.coordenadasTumulo = coordenadasTumulo;
        this.tempoDeRespawn = tempoDeRespawn;
        this.informacoesExtras = informacoesExtras;
        this.imagem = imagem;
    }
}
module.exports = Mvp;