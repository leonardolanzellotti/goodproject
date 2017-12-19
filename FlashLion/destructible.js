//--> Classe genérica para representar um objeto destrutível.
var Destructible = enchant.Class.create (enchant.Sprite, {
    initialize: function (x, y, source) {
        enchant.Sprite.call(this, source.width, source.height);
        this.source = source;
        this.x = x;
        this.y = y;
        this.image = game.assets[this.source.image];
        this.frame = SpriteMath.buildArray(SpriteMath.incrToArray(0, 14), 2);
        this.armor = this.source.armor;
        //this.backgroundColor = "green";
        this.speed = 10;
        this.id = counterId++;        
        Layers.destructibles.addChild(this);
    },
    destroy: function () {        
        Layers.destructibles.removeChild(this) + game.rootScene.removeChild(this);
    },
    onenterframe: function () {
        if (this.age % 6 == 0) {
            this.y += this.speed;
        }
        if (background.y + this.y > game.height) {
            return this.destroy();
        }
    },
    move: function (x, y) {
        this.moveTo(x, y);
    },
    updateArmor: function () {

    },
    applyDamage: function (damage) {
        this.armor -= damage;

        if (this.armor <= 0) {
            return this.destroy();
        } 

        if (this.armor >= 20) {
            //this.backgroundColor = "green";
        } else if (this.armor >= 10) {
            //this.backgroundColor = "yellow";
        } else if (this.armor >= 3) {
            //this.backgroundColor = "red";
        }
    }    
});