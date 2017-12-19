//--> Classe estendida de BaseNPC. Inimigo básico, anda e atira uma vez.
var NPC_01 = enchant.Class.create (BaseNPC, {
    initialize: function (x, y, source) {
        source.x = x;
        source.y = y;
        var shotImage = game.assets[source.shotImage];
        source.shotConfig = [{
            xRelation: source.width / 2,
            yRelation: source.height / 2,
            image: shotImage,
            damage: source.damage,
            xSpeed: 0,
            ySpeed: DEFAULT.SHOT_ENEMY_SPEED,
            parent: this
        }];
        BaseNPC.call(this, source);
    }
});