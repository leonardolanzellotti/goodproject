
var NPC = enchant.Class.create(enchant.Group, {
    initialize: function (x, y, attr) {
        enchant.Group.call(this);
        this.x = (x != undefined) ? x : -100;
        this.y = (y != undefined) ? y : -100;
        this.width = 64;
        this.height = 64;
        this.attr = attr;
        this.life = attr.LIFE;
        this.shotSpeed = attr.SHOT_SPEED;
        this.rateTarget = attr.RATE + Math.floor(Math.random() * 20);
        this.rateCounter = this.rateTarget;                
        this.isHidden = true;
        this.isDefeated = false;
        this.addSprite();
        this.addLifeLabel();
        game.rootScene.addChild(this);
    },
    addSprite: function () {
        var sprite = new Sprite(this.width, this.height);
        sprite.image = game.assets[RESOURCE.getPath("IMAGE", this.attr.IMAGE)];
        sprite.frame = 0;
        sprite.animCloseMouth = [0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3];
        sprite.animDelay = 3 * sprite.animCloseMouth.length;
        sprite.idleDelay = Math.floor(Math.random() * 80) + 100;

        sprite.tl.delay(sprite.idleDelay).then(function () {
            this.frame = sprite.animCloseMouth;
        }).delay(sprite.animDelay).then(function () {
            this.frame = 0;
        }).loop();

        this.sprite = sprite;
        this.addChild(sprite);
        return sprite;
    },
    addBlastDamage: function () {
        var sprite = new Sprite(16, 16);
        sprite.image = game.assets[RESOURCE.getPath("IMAGE", "blast")];        
        sprite.x = this.x + (Math.random() * 20) + 8;
        sprite.y = this.y + (Math.random() * 20) + 8;
        sprite.frame = [
            0,0,0,0,0,0,
            1,1,1,1,1,1,
            2,2,2,2,2,2,
            3,3,3,3,3,3,];
        sprite.tl.moveBy(0, -10, 24).then(function () {
            game.rootScene.removeChild(sprite);
        });
        game.rootScene.addChild(sprite);
    },
    addLifeLabel: function () {
        this.bgLifeLabel = new Label();
        this.bgLifeLabel.width = this.width * 0.8;
        this.bgLifeLabel.height = 3;
        this.bgLifeLabel.x = this.width * 0.1;
        this.bgLifeLabel.y = this.height - this.bgLifeLabel.height;
        this.bgLifeLabel.backgroundColor = NPC_LIFE.BGCOLOR;

        this.fgLifeLabel = new Label();
        this.fgLifeLabel.width = this.width * 0.8;
        this.fgLifeLabel.height = 3;
        this.fgLifeLabel.x = this.width * 0.1;
        this.fgLifeLabel.y = this.height - this.fgLifeLabel.height;
        this.fgLifeLabel.backgroundColor = NPC_LIFE.FGCOLOR;

        this.addChild(this.bgLifeLabel);
        this.addChild(this.fgLifeLabel);
    },
    onDamage: function (damage) {
        this.life -= damage;

        if (this.life <= 0) {            
            var self = this;
            this.isDefeated = true;
            GUI.labelScore.update(this.attr.SCORE);
            GUI.enemiesDefeated++;
            this.fgLifeLabel.width = 0;
            this.tl.clear().scaleTo(0,0,8).then(function () {
                game.rootScene.removeChild(self);
            });
        } else {
            this.fgLifeLabel.width = this.life * this.bgLifeLabel.width / this.attr.LIFE;
            this.addBlastDamage();
        }
    },
    addShot: function ()  {
        var damage = this.attr.DAMAGE;
        var sprite = new Sprite(10, 32);
        sprite.image = game.assets[RESOURCE.getPath("IMAGE", "npc_shot2")];
        sprite.frame = 0;
        sprite.x = this.x + (this.width - sprite.width) / 2;
        sprite.y = this.y;
        sprite.shotSpeed = this.shotSpeed;

        sprite.onenterframe = function () {
            this.y += this.shotSpeed;

            $(game.rootScene.childNodes).each(function (index, element) {
                if (sprite.intersect(element.sprite)) {

                    //--> Verificar colisões com Navy.
                    if (element instanceof Navy && element.life > 0) {
                        element.onDamage(damage);
                        game.shotLayer.removeChild(sprite);
                    }
                }
            });

            if (sprite.y > game.height) {
                game.shotLayer.removeChild(sprite);
            }
        };
        game.shotLayer.addChild(sprite);        
    },
    movePath: function (path, startDelay) {   
        var self = this;        
        var scaleX = game.width / 100;
        var scaleY = game.height / 100;
        var anim = "this.tl";
        startDelay = (startDelay != undefined) ? startDelay : 1;
        this.isHidden = false;

        anim += ".delay(" + startDelay + ")";
        for (var i in path) {
            anim += ".moveTo(" + path[i].x * scaleX + ", " + path[i].y * scaleY + ", " + path[i].time + ")";
        }
        anim += ".then(function(){self.isHidden = true;})"
        eval(anim);
    },
    onenterframe: function () {

        if (gameStatus == GAME_STATUS.PLAYING) {
            if (!this.isHidden && !this.isDefeated) {
                if (this.rateCounter > this.rateTarget) {
                    this.addShot();
                    this.rateCounter = 0;            
                } else {
                    this.rateCounter++;
                }            
            }            
        }
    },   
});
