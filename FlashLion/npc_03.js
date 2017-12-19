//--> Classe genérica para representar um inimigo NPC nível 3.
var NPC_03 = enchant.Class.create (enchant.Sprite, {
    initialize: function (x, y, source) {
        enchant.Sprite.call(this, source.width, source.height);
        this.source = source;
        this.x = x;
        this.y = y;
        this.image = game.assets[this.source.image];
        this.frame = 0;
        this.armor = this.source.armor;
        this.speed = 10;
        this.id = counterId++;        
        Layers.enemies.addChild(this);
    },
    destroy: function () {
        Layers.enemies.removeChild(this) + game.rootScene.removeChild(this);
    },
    onenterframe: function () {
        if (this.age % 6 == 0) {
            this.y += this.speed;
        }
        for (var i in Layers.navys.childNodes) {
            var navy = Layers.navys.childNodes[i];
            if (this.intersect(navy)) {
                return navy.applyDamage(this.armor) + this.destroy();
            }            
        }        
        if (background.y + this.y > game.height) {
            return this.destroy();
        }
    },
    move: function (x, y) {
        this.moveTo(x, y);
    },
    applyDamage: function (damage) {
        this.armor -= damage;
        if (this.armor <= 0) {
            return this.destroy();
        } 
    }    
});