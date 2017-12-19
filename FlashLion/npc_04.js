//--> Classe para representar um inimigo estilo torre fixa, 
//--> pode ser um tanque, uma torre, ou qualquer coisa fixada no solo. 
//--> (Não há colisão com as naves).
var NPC_04 = enchant.Class.create (enchant.Sprite, {
    initialize: function (x, y, source) {
        enchant.Sprite.call(this, source.width, source.height);
        this.source = source;
        this.x = x;
        this.y = y;
        this.direction = (this.x < 100) ? 1 : -1;
        this.image = game.assets[this.source.image];
        this.shotImage = game.assets[IMAGES.SHOT_NPC_04];
        this.frame = 0;
        this.armor = this.source.armor;
        this.id = counterId++;
        this.rateMaxCounter = 60;
        this.rateCounter = this.rateMaxCounter;
        this.delayBetweenShots = 10;
        this.damage = 1;
        this.shotConfig = [{
            xRelation: this.width / 2,
            yRelation: this.height / 2,
            image: this.shotImage,
            damage: this.damage,
            xSpeed: 0,
            ySpeed: 0,
            rotateAngle: 20,
            parent: this
        },{
            xRelation: this.width / 2,
            yRelation: this.height / 2,
            image: this.shotImage,
            damage: this.damage,
            xSpeed: 0,
            ySpeed: 0,
            delayed: 7,
            rotateAngle: 20,
            parent: this
        },{
            xRelation: this.width / 2,
            yRelation: this.height / 2,
            image: this.shotImage,
            damage: this.damage,
            xSpeed: 0,
            ySpeed: 0,
            delayed: 14,
            rotateAngle: 20,
            parent: this
        }];
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
            var pos = {x: this.x, y: this.y + background.y};
            $(this.shotConfig).each(function (index, config) {
                var nearestNavy = Plain.nearestOf(pos, Layers.navys.childNodes).element;
                config.xSpeed = (nearestNavy.x - pos.x) / (4 * DEFAULT.SHOT_ENEMY_SPEED_FAST);
                config.ySpeed = (nearestNavy.y - pos.y) / (4 * DEFAULT.SHOT_ENEMY_SPEED_FAST);
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