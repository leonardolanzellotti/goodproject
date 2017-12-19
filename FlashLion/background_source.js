
//--> Estrutura para armazenar os recursos de um level.
var BackgroundSource = function (image, speed) {
	this.source = new Sprite();
	this.source.image = game.assets[image];
	this.height = this.source.image.height;	
	this.x = 0;
	this.y = -this.height + game.height;
	this.width = game.width;
	this.speed = speed;	
	this.destructibles = []; 
	this.destructibles.name = "destructibles";
	this.enemies = []; 
	this.enemies.name = "enemies";
};
