(function() {
//Gestion canvas

canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
var width = canvas.width;
var height = canvas.height;
var context = canvas.getContext("2d");

//Son
var mysound;
mySound = new sound("sound/test2.mp3");

function Marche()
{
		this.rep = "img/marche.png";
		this.x = 12;
		this.y = 0;
}

//Classe Fermier
function Fermier(nom)
{
    this.nom = nom;
		this.rep = "img/farmer.png";
		this.x = 0;
		this.y = 0;
		this.pts = 0;
		this.sacGraine = new Array(new GraineCarotte(), new GrainePoireau(),new GrainePoireau(), new GrainePatate());
   	this.sacLegume = new Array(new Poireau(), new Patate(), new Patate());

		this.planterGraine = function(variete) {
			for(var x in this.sacGraine){
				if(this.sacGraine[x].x != this.x && this.sacGraine[x].y != farmer.y){
					if(this.sacGraine[x].variete == variete && this.sacGraine[x].enTerre == false) {
						this.sacGraine[x].enTerre = true;
						//this.sacGraine.splice(x,1);
						console.log(`${this.nom} a planté une graine de ${variete}`);
						this.sacGraine[x].x = this.x;
						this.sacGraine[x].y = this.y;
						console.log(this.sacGraine[x].x, this.sacGraine[x].y);
						tile[this.y][this.x] = 3;
						gameLoop();
						//alert('Graine plantée!');
						break;
					}
				}
				else if(x==this.sacGraine.length-1) {
					console.log(`${this.nom} ne possede pas de ${variete}.`);
					//alert('pas de graine hélas');
				}
				}
			}

		this.recolterLegume = function() {
			for(var x in this.sacGraine){
				if(this.x==this.sacGraine[x].x && this.y==this.sacGraine[x].y && this.sacGraine[x].etatMur==true){
					if(this.sacGraine[x].variete=='patate'){
							this.sacLegume.push(new Patate());
					}else if(this.sacGraine[x].variete=='carotte'){
							this.sacLegume.push(new Carotte());
					}else if(this.sacGraine[x].variete=='poireau'){
							this.sacLegume.push(new Poireau());
					}
					this.sacGraine.splice(x,1);
					tile[this.y][this.x] = 11;
					gameLoop();
				}
			}
		}

		this.echangerGraine = function(legume) {
			for(x in this.sacLegume){
				if(this.sacLegume[x].variete == "patate" && legume=="patate" && this.getNbPatate() > 0){
					this.sacGraine.push(new GrainePatate(), new GrainePatate());
					this.pts += this.sacLegume[x].pts;
					this.sacLegume.splice(x,1);
					break;
				}else if(this.sacLegume[x].variete == "carotte" && legume=="carotte" && this.getNbCarotte() > 0){
					this.sacGraine.push(new GraineCarotte(), new GraineCarotte());
					this.pts += this.sacLegume[x].pts;
					this.sacLegume.splice(x,1);
					break;
				}else if(this.sacLegume[x].variete == "poireau" && legume=="poireau" && this.getNbPoireau() > 0){
					this.sacGraine.push(new GrainePoireau(), new GrainePoireau());
					this.pts += this.sacLegume[x].pts;
					this.sacLegume.splice(x,1);
					break;
				}
			}
		}

		this.move = function(df,dl)	{
			var diff = this.y - df;
			this.y -= diff;
			var diffl = this.x - dl;
			this.x -= diffl;
			console.log('déplacement');
		}

		this.inventaire = function()	{

			//alert(this.sacGraine[0].variete);
      console.log(this.sacGraine);

		}

		this.getNbPatate = function() {
			nbpatate=0;
			for(var x in this.sacLegume){
				if(this.sacLegume[x].variete == "patate"){
					nbpatate+=1;
				}
			}
			return nbpatate;
		}

		this.getNbCarotte = function() {
			nbcarotte=0;
			for(var x in this.sacLegume){
				if(this.sacLegume[x].variete == "carotte"){
					nbcarotte+=1;
				}
			}
			return nbcarotte;
		}

		this.getNbPoireau = function() {
			nbpoireau=0;
			for(var x in this.sacLegume){
				if(this.sacLegume[x].variete == "poireau"){
					nbpoireau+=1;
				}
			}
			return nbpoireau;
		}

		this.getNbGrainePatate = function() {
			nbpatate=0;
			for(var x in this.sacGraine){
				if(this.sacGraine[x].variete == "patate" && this.sacGraine[x].enTerre == false){
					nbpatate+=1;
				}
			}
			return nbpatate;
		}

		this.getNbGraineCarotte = function() {
			nbcarotte=0;
			for(var x in this.sacGraine){
				if(this.sacGraine[x].variete == "carotte" && this.sacGraine[x].enTerre == false){
					nbcarotte+=1;
				}
			}
			return nbcarotte;
		}

		this.getNbGrainePoireau = function() {
			nbpoireau=0;
			for(var x in this.sacGraine){
				if(this.sacGraine[x].variete == "poireau" && this.sacGraine[x].enTerre == false){
					nbpoireau+=1;
				}
			}
			return nbpoireau;
		}

		this.moveUp = function() {
      if(this.x-1>=0){
			   this.x -=1;
         gameLoop();
      }
		}
		this.moveDown = function() {
      if(this.x+1<=14){
  			this.x +=1;
        gameLoop();
      }
		}
		this.moveRight = function() {
      if(this.y-1>=0){
    		this.y -=1;
        gameLoop();
      }
		}
		this.moveLeft = function() {
      if(this.y+1<=14){
  			this.y +=1;
        gameLoop();
      }
		}

}

// class Graine
function Graine() {
    this.enTerre = false;
    this.etatMur = false;
		this.x;
		this.y;

    this.murir = function() {
        if (this.enTerre) {
            if(this.tpsMurir>0){
                this.tpsMurir--;
            }else if(this.tpsMurir==0 && this.etatMur==false){
							this.etatMur = true;
							tile[this.y][this.x] = this.tile;
							gameLoop();
						}
				}
    }
}

GrainePatate.prototype = new Graine; // heritage
function GrainePatate() {
    this.variete = 'patate';
    this.tpsMurir = 10;
    this.tile = 6;
}

GraineCarotte.prototype = new Graine; // heritage
function GraineCarotte() {
    this.variete = 'carotte';
    this.tpsMurir = 30;
    this.tile = 7;
}

GrainePoireau.prototype = new Graine; // heritage
function GrainePoireau() {
    this.variete = 'poireau';
    this.tpsMurir = 15;
    this.tile = 8;
}

// class Legume
function Legume() {
    this.variete = "default";
    this.pts = 5;
}

Patate.prototype = new Legume; // heritage
function Patate() {
    this.variete = 'patate';
    this.pts = 10;
}

Carotte.prototype = new Legume; // heritage
function Carotte() {
    this.variete = 'carotte';
    this.pts = 20;
}

Poireau.prototype = new Legume; // heritage
function Poireau() {
    this.variete = 'poireau';
    this.pts = 15;
}

// Initialisation
var tile = [];
let farmer = new Fermier('Michel');
document.getElementById('name').innerText = farmer.nom;
let marche = new Marche;
var cols = 15;
var rows = 15;
for (var y = 0; y < rows; y++) {
	tile[y] = [];
	farmer[y] = [];
	for (var x = 0; x < cols; x++) {
		var t = 1;
		if(Math.random()<0.05) t=9;
		if(Math.random()<0.05) t=10;
		if(Math.random()<0.01) t=12;
    if ((x<=marche.x+1 && x>=marche.x-1 && y<=marche.y+1 && y>=marche.y-1)) t = 5;
    if (x==marche.x && y==marche.y) t = 4;
		tile[y][x] = t;
	}
}

// Création de l'environement isométrique
var IsoW = 40; // Largeur cellule
var IsoH = 20; // Hauteur cellule
var IsoX = width/2;
var IsoY = 20;
function IsoToScreenX(localX, localY) {
	return IsoX + (localX - localY) * IsoW;
}
function IsoToScreenY(localX, localY) {
	return IsoY + (localX + localY) * IsoH;
}
function ScreenToIsoX(globalX, globalY) {
	return ((globalX - IsoX) / IsoW + (globalY - IsoY) / IsoH) / 2;
}
function ScreenToIsoY(globalX, globalY) {
	return ((globalY - IsoY) / IsoH - (globalX - IsoX) / IsoW) / 2;
}

// Dessine une parcelle aux coordonées fournies
function DrawIsoTile(x, y, nature) {
  image = new Image();

  if(nature=="ground"){

    image.src = "img/herbe1.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="barup") {

    image.src = "img/BarriereTest.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y-25, 78, 53+25);

  }else if (nature=="plantation") {

    image.src = "img/plantation.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="marche") {

    image.src = "img/shop.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y-27, 78, 53+27);

  }else if (nature=="marchearound") {

    image.src = "img/nextstore.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="patate") {

    image.src = "img/patate.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="carotte") {

    image.src = "img/carotte.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="poireau") {

    image.src = "img/poireau.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="herbe2") {

    image.src = "img/herbe2.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="herbe3") {

    image.src = "img/herbe3.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="afterplantation") {

    image.src = "img/plantation2.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }else if (nature=="rock") {

    image.src = "img/rock.png";
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, x-40, y, 78, 53);

  }
}

// Fonction de dessin
var frame = 0;
var seconds = 0;
function gameLoop(upclock) {
	frame += 1;
	if(upclock == true){seconds+=1;};
	//context.clearRect(0, 0, width, height);
	for (var y = 0; y < rows; y++)
	for (var x = 0; x < cols; x++) {
		var t = tile[y][x];
		var rx = IsoToScreenX(x, y);
		var ry = IsoToScreenY(x, y);
		// draw tile (if any):
		switch (t) {
			case 1: DrawIsoTile(rx, ry, "ground"); break;
			case 2: DrawIsoTile(rx, ry, "barup"); break;
      case 3: DrawIsoTile(rx, ry, "plantation"); break;
      case 4: DrawIsoTile(rx, ry, "marche"); break;
      case 5: DrawIsoTile(rx, ry, "marchearound"); break;
      case 6: DrawIsoTile(rx, ry, "patate"); break;
			case 7: DrawIsoTile(rx, ry, "carotte"); break;
			case 8: DrawIsoTile(rx, ry, "poireau"); break;
			case 9: DrawIsoTile(rx, ry, "herbe2"); break;
			case 10: DrawIsoTile(rx, ry, "herbe3"); break;
			case 11: DrawIsoTile(rx, ry, "afterplantation"); break;
			case 12: DrawIsoTile(rx, ry, "rock"); break;
		}
		// draw farmer (if any):
		if (farmer) {
				var fx = IsoToScreenX(farmer.x, farmer.y);
				var fy = IsoToScreenY(farmer.x, farmer.y);
				fx -= 16;
        drawing = new Image();
        drawing.src = "img/farmer.png";
        context.drawImage(drawing,fx,fy);

				var patate = document.getElementById('itempatate');
				patate.setAttribute('data-count',farmer.getNbPatate());
				var carotte = document.getElementById('itemcarotte');
				carotte.setAttribute('data-count',farmer.getNbCarotte());
				var poireau = document.getElementById('itempoireau');
				poireau.setAttribute('data-count',farmer.getNbPoireau());

				var grainepatate = document.getElementById('itemgrainepatate');
				grainepatate.setAttribute('data-count',farmer.getNbGrainePatate());
				var grainecarotte = document.getElementById('itemgrainecarotte');
				grainecarotte.setAttribute('data-count',farmer.getNbGraineCarotte());
				var grainepoireau = document.getElementById('itemgrainepoireau');
				grainepoireau.setAttribute('data-count',farmer.getNbGrainePoireau());

		}
	}
	for(var x in farmer.sacGraine){
		if(farmer.sacGraine[x].etatMur!=true){
			var rx = IsoToScreenX(farmer.sacGraine[x].x, farmer.sacGraine[x].y);
			var ry = IsoToScreenY(farmer.sacGraine[x].x, farmer.sacGraine[x].y);
			context.font = "20px Arial";
			context.fillStyle = '#ffffff';
			context.fillText(farmer.sacGraine[x].tpsMurir, rx-8, ry+22);
		}
		if(upclock==true){farmer.sacGraine[x].murir();}
	}
	document.getElementById('daynb').innerText = seconds;
	document.getElementById('nivnb').innerText = farmer.pts+"/300";
}
gameLoop();
setInterval(gameLoop, 500);

// horloge
function clk() {
	gameLoop(true);
}

setInterval(clk, 1000);

// Réception des appuis touches fleches
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38')      { farmer.moveUp();    /*mySound.play();*/ }
	else if (e.keyCode == '40') { farmer.moveDown();  /*mySound.play();*/ }
    else if (e.keyCode == '37') { farmer.moveLeft();  /*mySound.play();*/ }
	else if (e.keyCode == '39') { farmer.moveRight(); /*mySound.play();*/ }
	else if (e.keyCode == '65')	{
		if ((farmer.x<=marche.x+1 && farmer.x>=marche.x-1 && farmer.y<=marche.y+1 && farmer.y>=marche.y-1)){
			farmer.echangerGraine('patate');
		}else{
			farmer.planterGraine('patate');
		}
	}
	else if (e.keyCode == '90')	{
		if ((farmer.x<=marche.x+1 && farmer.x>=marche.x-1 && farmer.y<=marche.y+1 && farmer.y>=marche.y-1)){
			farmer.echangerGraine('carotte');
		}else{
			farmer.planterGraine('carotte');
		}
	}
	else if (e.keyCode == '69')	{
		if ((farmer.x<=marche.x+1 && farmer.x>=marche.x-1 && farmer.y<=marche.y+1 && farmer.y>=marche.y-1)){
			farmer.echangerGraine('poireau');
		}else{
			farmer.planterGraine('poireau');
		}
	}
	else if (e.keyCode == '32')	{farmer.recolterLegume();}		// Space bar
}

// Fonction son
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

// POPUP
var modal = document.getElementById("popup");
var btn = document.getElementById("popupbtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

})();
