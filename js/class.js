// MARCHé CONSTRUCTOR

function Marche() {
    this.etalGraine = [new GrainePoireau()];
    this.etalLegume = [];
}

// FERMIER CONSTRUCTOR

function Fermier(nom)
{
    this.nom = nom;
    this.sacGraine = new Array(new GrainePatate());
    this.sacLegume = new Array(new Patate());

    this.planterGraine = function(variete) {
        for(var x in this.sacGraine){
            label:
            if(this.sacGraine[x].variete == variete) {
                this.sacGraine[x].enTerre = true;
                this.sacGraine.splice(x,1);

                console.log(`${this.nom} a planté une graine de ${variete}`);
                break label;
            }
            else if(x==this.sacGraine.length-1) {
                console.log(`${this.nom} ne possede pas de ${variete}.`);
            }
            }
        }

    this.showGraines = function() {
        for (var x in this.sacGraine)
        {
            console.log(this.sacGraine[x]);
        }
    }

    this.echangerGraine = function(variete) {
        for (x in this.sacLegume) {

            if(this.sacLegume[x].variete == variete) {
                if (variete == 'patate') {               // on échange une patate contre 2 graines de poireaux
                    this.sacGraine.push(new GrainePoireau());
                    this.sacLegume.splice(x,1);
                    break;
                } else {
                    console.log(`vous n'avez pas de graine de ${variete}`);
                }
            }

        }

    }

}
// SEED CONSTRUCTOR

function Graine() {
    this.enTerre = false;
    this.etatMur = false;

    this.murir = function() {
        if (this.enTerre) {
            while(this.tpsMurir){
                let nbrTot= tpsMurir;
                this.tpsMurir--;
                //console.log(`${nbrTot-this.tpsMurir}  nuit se sont ecoulees`)
            }
            this.etatMur = true;
        }
    }
}

//GrainePatate

GrainePatate.prototype = new Graine; // heritage
function GrainePatate() {
    this.variete = 'patate';
    this.tpsMurir = 10;
}

//GrainePoireau

GrainePoireau.prototype = new Graine; // heritage
function GrainePoireau() {
    this.variete = 'poireau';
    this.tpsMurir = 15;
}

// LEGUME CONSTRUCTOR

function Legume()  {
}
Patate.prototype = new Legume;
function Patate() {
    this.variete = 'patate';
    this.pts = 5;
}

/*
let g1= new Graine('cerise', 15);   // le new est important pour la creation
let joe = new Fermier('Joe');
console.log('variete:',g1.variete, 'enTerre: ', g1.enTerre, 'mûr :', g1.etatMur);
console.log(joe.sacGraine);
joe.planterGraine(g1);
g1.murir();
console.log('variete:',g1.variete, 'enTerre:', g1.enTerre, 'mûr:', g1.etatMur);

console.log(joe.sacGraine);

*/

let g2 = new GrainePatate();

let f = new Fermier('MICHEL');

//f.echangerGraine('patate');

console.log(f.sacLegume);
console.log(f.sacGraine);
