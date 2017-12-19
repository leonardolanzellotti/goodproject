
var Navy = enchant.Class.create(enchant.Group, {
    initialize: function (x, y) {
        enchant.Group.call(this);
        this.width = 64;
        this.height = 64;
        this.x = x - this.width / 2;
        this.y = y;
        this.life = 30;
        this.speed = 10;
        this.shotSpeed = 15;
        this.rateTarget = 12;        
        this.rateCounter = this.rateTarget;
        this.damage = 1;
        this.cannonsCount = 1;
        this.maxLife = this.life;
        this.addSprite();
        game.rootScene.addChild(this);
    },
    addSprite: function () {
        var sprite = new Sprite(this.width, this.height);
        sprite.image = game.assets[RESOURCE.getPath("IMAGE", "navy1")];
        sprite.frame = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2];        
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
        sprite.tl.moveBy(0, 10, 24).then(function () {
            game.rootScene.removeChild(sprite);
        });
        game.rootScene.addChild(sprite);
    },
    onDamage: function (damage) {
        this.life -= damage;        
        GUI.fgNavyLifeLabel.update(Math.max(this.life, 0), this.maxLife);
        if (this.life <= 0) {
            this.tl.scaleTo(0,0,8);
            if (DEBUG)
                console.log("Player morreu!");
            GUI.onFinishCombat(false);
        } else {
            this.addBlastDamage();
        }
    },
    addShot: function (offsetX)  {
        var self = this;
        var damage = this.damage;
        var sprite = new Sprite(8, 29);
        sprite.image = game.assets[RESOURCE.getPath("IMAGE", "navy_shot")];
        sprite.frame = 0;
        sprite.x = this.x + (this.width - sprite.width) / 2 + offsetX;
        sprite.y = this.y;
        sprite.shotSpeed = this.shotSpeed;

        sprite.onenterframe = function () {
            this.y -= this.shotSpeed;

            $(game.rootScene.childNodes).each(function (index, element) {
                if (sprite.intersect(element.sprite)) {

                    //--> Verificar colisões com NPCs.
                    if (element instanceof NPC && element.life > 0) {
                        element.onDamage(damage);
                        game.shotLayer.removeChild(sprite);
                    } else
                    //--> Verificar colisões com Itens.
                    if (element instanceof Item) {
                        element.activate(self);
                        game.shotLayer.removeChild(sprite);
                    }
                }
            });

            if (this.y + this.height < 0) {
                game.shotLayer.removeChild(this);
            }
        };
        game.shotLayer.addChild(sprite);        
    },
    moveLeft: function () {
        if (this.x - this.speed > 0) {
            this.x -= this.speed;
        }
    },
    moveRight: function () {
        if (this.x + this.width + this.speed <= game.width) {
            this.x += this.speed;
        }
    },
    onenterframe: function () {

        if (gameStatus == GAME_STATUS.PLAYING) {
            if (game.input.moveLeft) {
                this.moveLeft();
            } else if (game.input.moveRight) {
                this.moveRight();
            }

            if (this.rateCounter > this.rateTarget) {
                if (this.cannonsCount == 1) {
                    this.addShot(NAVY_LIMIT.ONE_CANNONS_OFFSET);
                } else if (this.cannonsCount == 2) {
                    this.addShot(-NAVY_LIMIT.TWO_CANNONS_OFFSET);
                    this.addShot(+NAVY_LIMIT.TWO_CANNONS_OFFSET);
                } else if (this.cannonsCount == 3) {
                    this.addShot(-NAVY_LIMIT.TWO_CANNONS_OFFSET);
                    this.addShot(NAVY_LIMIT.ONE_CANNONS_OFFSET);
                    this.addShot(+NAVY_LIMIT.TWO_CANNONS_OFFSET);
                }
                this.rateCounter = 0;
            } else {
                this.rateCounter++;
            }            
        }
    },
    //--> Função de upgrade das características intrinsecas da nave.
    upgrade: function (phase) {
        var i = 0;
        for (i = NAVY_UPGRADE.length - 1; i >= 0; i--) {
            if (phase >= NAVY_UPGRADE[i].PHASE) {
                this.damage = NAVY_UPGRADE[i].DAMAGE;
                this.life = NAVY_UPGRADE[i].LIFE;
                this.cannonsCount = NAVY_UPGRADE[i].CANNON;
                this.maxLife = NAVY_UPGRADE[i].LIFE;
                i++;
                break;
            }
        }
        return i;
    },
    //--> Função de bônus. Quando o player adquirir um item.
    increaseLife: function (value) {
        this.life = Math.min(this.life + value, this.maxLife);
        GUI.fgNavyLifeLabel.update(this.life, this.maxLife);
    },
    //--> Função de bônus. Quando o player adquirir um item.
    increaseDamage: function (value) {
        this.damage = Math.min(this.damage + value, NAVY_LIMIT.DAMAGE);
    },
    //--> Função de bônus. Quando o player adquirir um item.
    decreaseRate: function (value) {
        this.rateTarget = Math.max(this.rateTarget - value, NAVY_LIMIT.RATE);
        this.rateCounter = 0;
    },
});
