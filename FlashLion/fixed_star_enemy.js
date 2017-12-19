//--> Classe para representar um inimigo de tiro estrelar.
var FixedStarEnemy = enchant.Class.create (enchant.Sprite, {
    initialize: function (x, y, source) {
        enchant.Sprite.call(this, source.width, source.height);
        this.source = source;
        this.x = x;
        this.y = y;
        this.image = game.assets[this.source.image];
        this.shotImage = game.assets[IMAGES.FLASH_SHOT];
        this.frame = 0;
        this.armor = this.source.armor;
        this.id = counterId++;
        this.rateMaxCounter = 45;
        this.rateCounter = this.rateMaxCounter;
        this.damage = 1;
        this.shotConfig = EnemyShot.prototype.starShotConfig(this, {from: 45, to: 180, step: 10}, DEFAULT.SHOT_ENEMY_SPEED_SLOW, {x: this.width / 2, y: this.height / 2});
        Layers.enemies.addChild(this);
    },    
    destroy: function () {
        Layers.enemies.removeChild(this) + game.rootScene.removeChild(this);
    },
    onenterframe: function () {
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
    applyDamage: function (damage) {
        this.armor -= damage;
        if (this.armor <= 0) {
            return this.destroy();
        } 
    }    
});