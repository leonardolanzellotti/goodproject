
//--> Classe estática para definir os recursos do jogo, objetos, inimigos.. 
//--> Possui uma função para cada level. Para chamar: Levels.loadLevel_01()
var Levels = {

    loadLevel_01: function () {
		var source = new BackgroundSource(IMAGES.BACKGROUND_LEVEL_01, BACKGROUND_SPEED);

        //this.populate(source.destructibles, ITEM.DESTRUCTIBLE.SPACIAL_DEJECT_01, 40);
        //source.enemies.push({x: 250, y: 11000, item: ITEM.ENEMY.FIXED_STAR});
        this.populate(source.enemies, ITEM.ENEMY.NPC_01, 100);
        this.populate(source.enemies, ITEM.ENEMY.NPC_02, 60);

        //var b = new Boss_01();
        //b.start();               

        background = new Background(source);        
        this.addNavy();
        background.start();
	},

    populate: function (layer, item, n) {
        n = n || 1;
        for (var i = 0; i < n; i++) {
            var y = 1000 + Math.floor(Math.random() * 12000) + 1;
            layer.push({x: undefined, y: y, item: item});
        }
    },
        
	addNavy: function () {
		if (gameMode == GAME_MODE.MULTI_PLAYER_CLIENT) {
            navy = new Navy(game.width * 3 / 4, game.height - 100);
        } else {
            background.start();
            background.stackLayer(Layers.destructibles);
            background.stackLayer(Layers.enemies);

            if (gameMode == GAME_MODE.SINGLE_PLAYER) {
                navy = new Navy(game.width * 1 / 2, game.height - 100);
            } else {
                navy = new Navy(game.width * 1 / 4, game.height - 100);
            }
            navy.normalImage = game.assets[Navy.prototype.getNavyImageByIndex(chosenNavy)];
            navy.specialImage = game.assets[Navy.prototype.getSpecialImageByIndex(chosenNavy)];
            navy.animSpecial = Navy.prototype.getSpecialFramesetByIndex(chosenNavy);
            navy.special = Navy.prototype.getSpecialNameByIndex(chosenNavy);
            navy.image = navy.normalImage;
            navy.shotImage = game.assets[Shot.prototype.getNavyShotImageByIndex(chosenNavy)];
            navy.updateShotConfig();
        }
	}
};