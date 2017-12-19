//--> Classe estendida de BaseNPC. Anda e atira três vezes.
var NPC_02 = enchant.Class.create (BaseNPC, {
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
            delayed: 1,
            parent: this
        },{
            xRelation: source.width / 2,
            yRelation: source.height / 2,
            image: shotImage,
            damage: source.damage,
            xSpeed: 0,
            ySpeed: DEFAULT.SHOT_ENEMY_SPEED,
            delayed: 4,
            parent: this
        },{
            xRelation: source.width / 2,
            yRelation: source.height / 2,
            image: shotImage,
            damage: source.damage,
            xSpeed: 0,
            ySpeed: DEFAULT.SHOT_ENEMY_SPEED,
            delayed: 7,
            parent: this
        }];        
        BaseNPC.call(this, source);
    }
});