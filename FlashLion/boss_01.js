//--> Classe para representar o chefão da fase 1: Um escorpião.
var Boss_01 = enchant.Class.create (enchant.Sprite, {
    initialize: function () {
        enchant.Sprite.call(this, ITEM.ENEMY.BOSS_01.width, ITEM.ENEMY.BOSS_01.height);
        this.image = game.assets[IMAGES.BOSS_01];
        var img = game.assets[IMAGES.LION_SHOT];
        this.shotImage = {
            shot01: img,
            shot04: img
        };
        this.damage = {
            shot01: 2,
            shot04: 10
        };
        this.x = (game.width - ITEM.ENEMY.BOSS_01.width) / 2;
        this.y = -ITEM.ENEMY.BOSS_01.height;
        this.frame = 0;
        this.maxArmor = ITEM.ENEMY.BOSS_01.armor;
        this.armor = this.maxArmor;
        this.speed = ITEM.ENEMY.BOSS_01.speed;
        this.statesBeforeAnger = [];
        this.statesAfterAnger = [];
        this.environmentPivot = {x: (VIEWPORT.WIDTH - this.width) / 2, y: 65};

        this.id = counterId++;
        this.isHighlightLocked = false;
        Layers.bosses.addChild(this);        
    },
    destroy: function () {        
        return Layers.destructibles.removeChild(this) + game.rootScene.removeChild(this) + main();
    },
    start: function () {
        var entranceDuration = 40;        
        var _this = this;
        this.tl
            .moveTo(this.environmentPivot.x, this.environmentPivot.y, entranceDuration)
            .then(function () {
                _this.idleState();
            });
    },
    idleState: function () {

        var xDelay = 22;
        //var xDelay = 12;
        //var yDelay = 9;
        var yDelay = 19;
        var xPadding = 90;
        var yPadding = 50;
        var right = game.width - this.width - xPadding;
        var top = this.environmentPivot.y;
        var _this = this;

        this.tl
            .moveTo(xPadding, top, xDelay)
            .moveBy(0, yPadding, yDelay).then(function (){_this.shot01()})
            
            .moveTo(right, top, xDelay)
            .moveBy(0, yPadding, yDelay).then(function (){_this.shot01()})

            .moveTo(xPadding, top, xDelay)
            .moveBy(0, yPadding, yDelay).then(function (){_this.shot01()})

            .moveTo(right, top, xDelay)
            .moveBy(0, yPadding, yDelay).then(function (){_this.shot01()})

            .moveTo(xPadding, top, xDelay)
            .moveBy(0, yPadding, yDelay).then(function (){_this.shot01()})

            .moveTo(right, top, xDelay)
            .moveBy(0, yPadding, yDelay).then(function (){_this.shot01()})

            .moveTo((game.width - this.width) / 2, this.y - yPadding, xDelay).then(function () {
                _this.shot02();
            });
    },
    shot01: function () {
        console.log("tiro pra frente com as garras, alternando esq e dir");        
        var xRelation = this.width / 2;
        var yRelation = this.height / 2;

        //--> Equalizando diferença entre as layers bosses e shots.
        xRelation -= background.x;
        yRelation -= background.y;

        $([{
            xRelation: xRelation,
            yRelation: yRelation,
            image: this.shotImage.shot01,
            damage: this.damage.shot01,
            rotateAngle: 15,
            xSpeed: -3,
            ySpeed: DEFAULT.SHOT_ENEMY_SPEED_FAST,
            parent: this
        },{
            xRelation: xRelation,
            yRelation: yRelation,
            image: this.shotImage.shot01,
            damage: this.damage.shot01,
            rotateAngle: 15,
            xSpeed: 0,
            ySpeed: DEFAULT.SHOT_ENEMY_SPEED_FAST,
            parent: this
        },{
            xRelation: xRelation,
            yRelation: yRelation,
            image: this.shotImage.shot01,
            damage: this.damage.shot01,
            rotateAngle: 15,
            xSpeed: 3,
            ySpeed: DEFAULT.SHOT_ENEMY_SPEED_FAST,
            parent: this
        }]).each(function (index, config) {                
            new EnemyShot(config);
        });
    },
    shot02: function () {
        console.log("sai da tela andando pra trás, aparece só a ponta da cauda e dispara um tirão.");        
        
        var goingYDelay = 35;
        var waitingDelay = 16;
        var movingXDelay = 22;
        var xPadding = 90;
        var rightBoss = VIEWPORT.WIDTH - this.width - xPadding;

        var wShot = 80;
        var hShot = VIEWPORT.HEIGHT;
        var rightShot = VIEWPORT.WIDTH - wShot - xPadding;
        var _this = this;

        this.tl
            .moveTo(this.environmentPivot.x, -this.height, goingYDelay)
            .moveBy(0, -1, waitingDelay)
            .moveBy(0, this.height * 0.3, goingYDelay * 0.7)
            .then(function () {
                var bigShot = new Sprite(wShot, hShot);
                bigShot.image = game.assets[IMAGES.BOSS_01_SHOT_02];
                bigShot.frame = ANIM_FRAMES.BOSS_01.SHOT_02;
                bigShot.onenterframe = function () {
                    if (this.age >= ANIM_FRAMES.BOSS_01.SHOT_02.length) {
                        this.frame = ANIM_FRAMES.BOSS_01.SHOT_02[ANIM_FRAMES.BOSS_01.SHOT_02.length - 1];
                    }
                };
                bigShot.opacity = 0;
                
                var parent = new Group();
                parent.width = _this.width;
                parent.x = (VIEWPORT.WIDTH - _this.width) / 2;                
                parent.y = _this.y;
                Layers.bosses.addChild(parent);

                _this.x = (parent.width - _this.width) / 2;
                _this.y = 0;

                bigShot.x = (parent.width - bigShot.width) / 2;
                bigShot.y = _this.y + _this.height;

                parent.addChild(_this);
                parent.addChild(bigShot);

                bigShot.tl.fadeIn(5);
                parent.tl
                    .delay(5)
                    .moveTo(xPadding, parent.y, movingXDelay)
                    .moveTo(rightBoss, parent.y, movingXDelay)
                    .moveTo(xPadding, parent.y, movingXDelay)
                    .moveTo(rightBoss, parent.y, movingXDelay)
                    .moveTo(xPadding, parent.y, movingXDelay)
                    .moveTo(rightBoss, parent.y, movingXDelay)
                    .moveTo(_this.environmentPivot.x, parent.y, movingXDelay)
                    .then(function () {
                        bigShot.tl.fadeOut(5);
                    })
                    .delay(5)
                    .moveTo(_this.environmentPivot.x, _this.environmentPivot.y, movingXDelay * 0.4)
                    .then(function () {
                        Layers.bosses.addChild(_this);
                        _this.moveTo(_this.environmentPivot.x, _this.environmentPivot.y);
                        Layers.bosses.removeChild(parent);
                        game.rootScene.removeChild(parent);

                        //--> Verificar HP para escolher próximo ataque.
                        if (_this.armor < _this.maxArmor * 0.40) {
                            if (Math.random() * 100 > 70) {
                                _this.shot04();                                
                            } else {
                                _this.idleState();                                
                            }
                        } else if (_this.armor < _this.maxArmor * 0.70) {
                            if (Math.random() * 100 > 70) {
                                _this.shot02();
                            } else {
                                _this.idleState();                                
                            }
                        } else {
                            _this.idleState();
                        }

                    });

            });

    },
    shot03: function () {
        console.log("dropa minas destrutíveis na tela");
    },
    shot04: function () {
        console.log("Bate as garras, disparando tiros em várias direções.");

        var _this = this;
        var shotConfig = EnemyShot.prototype.circleShotConfig(this, {from: 0, to: 360, step: 15}, DEFAULT.SHOT_ENEMY_SPEED_SLOW, {x: this.width / 2, y: this.height / 2});

        $(shotConfig).each(function (index, config) {                
            config.damage = _this.damage.shot04;
            new EnemyShot(config);
        });
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
    onenterframe: function () {      
    },
    move: function (x, y) {
        this.moveTo(x, y);
    },
    applyDamage: function (damage) {
        this.armor -= damage;
        this.highlight();
        if (this.armor <= 0) {
            return this.destroy();
        }
    }
});