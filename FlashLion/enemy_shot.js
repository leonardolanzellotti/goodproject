//--> Classe para representar um tiro inimigo básico.
var EnemyShot = enchant.Class.create (enchant.Sprite, {
    initialize: function (config) {
        enchant.Sprite.call(this, 8, 29);
        this.x = (background.x + config.parent.x) + config.xRelation - this.width/2;
        this.y = (background.y + config.parent.y) + config.yRelation - this.height/2;
        this.image = config.image;
        this.frame = 0;
        this.damage = config.damage;
        this.xSpeed = config.xSpeed;
        this.ySpeed = config.ySpeed;
        this.delayed = config.delayed || 0;
        this.visible = false;
        this.rotateAngle = config.rotateAngle || 0;        
        this.id = counterId++;
        Layers.shots.addChild(this);
    },
    destroy: function () {        
        Layers.shots.removeChild(this) + game.rootScene.removeChild(this);    
    },
    onenterframe: function () {
        if (this.age <= this.delayed) {
            return;
        }

        this.visible = true;
        if (this.rotateAngle > 0) {
            this.rotate(this.rotateAngle);
        }
        this.moveBy(this.xSpeed, this.ySpeed);      
        
        var _this = this;
        $(Layers.navys.childNodes).each(function (index, element) {
            if (_this.intersect(element)) {
                element.applyDamage(_this.damage);
                return _this.destroy();                
            }
        });

        if (!Plain.inCoverage(this, game)) {
            return this.destroy();
        }
    },

    circleShotConfig: function (parent, config, speed, pivot) {
        speed = speed || DEFAULT.SHOT_ENEMY_SPEED_MEDIUM;
        pivot = pivot || {x: 0, y: 0};
        config = config || {from: 0, to: 360, step: 30};
        var shotConfig = [];
        $(Plain.circlePos (config)).each(function (index, pos) {
            shotConfig.push({
                xRelation: pivot.x + parent.width / 2,
                yRelation: pivot.y + parent.height / 2,
                image: parent.shotImage,
                damage: parent.damage,
                xSpeed: speed * pos.x,
                ySpeed: speed * pos.y,
                parent: parent
            });
        });
        return shotConfig;
    },


    starShotConfig: function (parent, config, speed, pivot) {
        speed = speed || DEFAULT.SHOT_ENEMY_SPEED_MEDIUM;
        pivot = pivot || {x: 0, y: 0};
        config = config || {from: 0, to: 360, step: 30};
        var shotConfig = [];
        $(Plain.circlePos (config)).each(function (index, pos) {
            shotConfig.push({
                xRelation: pivot.x + parent.width / 2,
                yRelation: pivot.y + parent.height / 2,
                image: parent.shotImage,
                damage: parent.damage,
                xSpeed: speed * pos.x,
                ySpeed: speed * pos.y,
                delayed: index + 2,
                rotateAngle: 12,
                parent: parent
            });
        });
        return shotConfig;
    },    

});