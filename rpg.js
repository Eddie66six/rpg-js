//tipos
const Tipo = Object.freeze({
    GORDO: 0,
    MAGRO: 1,
    FEIO: 2
});
//profissoes
const Profissao = Object.freeze({
    TI: 0,
    PEDREIRO: 1,
    MOTOBOY: 2
});

//rpg
class Habilidade {
    constructor(keyAbilidade){
        this.level = 1;
        this.keyAbilidade = keyAbilidade;
    }
    AdicionarPontoAbilidade(){
        this.level++;
    }
}

class Attr {
    constructor(forca, inteligencia, agilidade){
        this.forca = forca;
        this.inteligencia = inteligencia;
        this.agilidade = agilidade;
    }
}

class AttrP {
    constructor(forca, inteligencia, agilidade){
        this.forca = forca;
        this.inteligencia = inteligencia;
        this.agilidade = agilidade;
    }
}

class Jogador {
    constructor(nome, tipo, profissao) {
        this.nome = nome;
        this.tipo = tipo;
        this.profissao = profissao;
        this.habilidades = [];
        this.pontosAttrDisponiveis = 2;
        this.postosHabilidadesDisponivies = 1;
        this.level = 0;
        this.status = { vidaAtual:0, vidaTotal: 0, manaAtual: 0, manaTotal: 0, velocidade: 0 };
        //
        this._AdicionarPontosPadrao();
    }

    _CalcularStatus () {
        //vida
        this.status.vidaTotal = this.level * (this.attr.forca * this.attrP.forca); 
        this.status.vidaAtual = this.status.vidaTotal;
        //mana
        this.status.manaTotal = this.level * (this.attr.inteligencia * this.attrP.inteligencia); 
        this.status.manaAtual = this.status.manaTotal;
        //defesa
        this.status.velocidade = this.level * (this.attr.agilidade * this.attrP.agilidade)
    }

    _AdicionarPontosPadrao(){
        switch(this.tipo){
            case Tipo.GORDO:
                this.attr = new Attr(10,5,4);
                break;
            case Tipo.MAGRO:
                this.attr = new Attr(5,5,10);
                break;
            case Tipo.FEIO:
                this.attr = new Attr(5,10,5);
                break;
        }
        this._AdicionarPorcentagemPadrao();
    }
    _AdicionarPorcentagemPadrao(){
        switch(this.profissao){
            case Profissao.TI:
                this.attrP = new AttrP(1.5,2,1.5);
                break;
            case Profissao.PEDREIRO:
                this.attrP = new AttrP(2,1.5,1.3);
                break;
            case Profissao.MOTOBOY:
                this.attrP = new AttrP(1.5,1.5,2);
                break;
        }
        this.AdicionarLevel(1);
    }

    AdicionarLevel(lvl) {
        this.level += lvl || 1;
        this.pontosAttrDisponiveis  += lvl || 1;
        this.postosHabilidadesDisponivies += lvl || 1;
        this._CalcularStatus();
    }
    AdicionarPontoAttr(attr){
        if(!attr || this.pontosAttrDisponiveis < (attr.forca + attr.inteligencia + attr.agilidade)) return;
        if(attr.forca > 0){
           this.attr.forca += attr.forca; 
        }
        if(attr.inteligencia > 0){
            this.attr.inteligencia += attr.inteligencia; 
        }
        if(attr.agilidade > 0){
            this.attr.agilidade += attr.agilidade; 
        }
        this.pontosAttrDisponiveis -= (attr.forca + attr.inteligencia + attr.agilidade);
        this._CalcularStatus();
    }
    AdicionarPontoHabilidade(habilidade) {
        let add = true;;
        for (const ab in this.habilidades) {
            if (ab.keyAbilidade === habilidade.keyAbilidade) {
                ab.AdicionarPontoAbilidade();
                add = false;
                break;
            }
        }
        if(add){
            this.abilidades.push(habilidade);
        }
        this.abilidades.push(abilidade);
    }
}