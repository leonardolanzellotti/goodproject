//--> Classe genérica para representar um NPC.
var BaseNPC = enchant.Class.create (enchant.Sprite, {
    initialize: function (source) {
        enchant.Sprite.call(this, source.width, source.height);
        this.source = source;
        this.x = source.x;
        this.y = source.y;
        this.image = game.assets[this.source.image];
        this.frame = source.frames.MOVE;
        this.armor = this.source.armor;
        this.speed = this.source.speed;
        this.id = counterId++;
        this.rateMaxCounter = this.source.rateMaxCounter;        
        this.rateCounter = this.rateMaxCounter;
        this.damage = this.source.damage;
        this.shotConfig = this.source.shotConfig;
        this.isHighlightLocked = false;
        Layers.enemies.addChild(this);
    },
    destroy: function () {
        Layers.enemies.removeChild(this) + game.rootScene.removeChild(this);
    },
    onenterframe: function () {
        this.moveBy(0, this.speed);
        for (var i in Layers.navys.childNodes) {
            var navy = Layers.navys.childNodes[i];
            if (this.intersect(navy)) {
                return navy.applyDamage(this.armor) + this.destroy();
            }            
        }        
        if (background.y + this.y > game.height) {
            return this.destroy();
        }
        if (this.rateCounter == this.rateMaxCounter) {
            $(this.shotConfig).each(function (index, config) {
                new EnemyShot(config);
            });
            this.rateCounter = 0;
        }

        //--> Contadores
        this.rateCounter = (this.rateCounter > this.rateMaxCounter) ? this.rateMaxCounter : this.rateCounter + 1;
    },
    move: function (x, y) {
        this.moveTo(x, y);
    },
    highlight: function () {
        if (!this.isHighlightLocked) {
            this.isHighlightLocked = true;
            var _this = this;
            this.tl
                .fadeTo(0.6, parseInt(0.6 * DEFAULT.HIGHLIGHT_ENEMY_DURATION))
                .fadeTo(1, parseInt(0.4 * DEFAULT.HIGHLIGHT_ENEMY_DURATION))
                .then(function () {
                    _this.isHighlightLocked = false;
                });            
        }
    },
    applyDamage: function (damage) {
        this.armor -= damage;
        this.highlight();
        if (this.armor <= 0) {
            return this.destroy();
        } 
    }    
});