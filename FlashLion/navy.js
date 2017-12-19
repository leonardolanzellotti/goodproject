
//--> Classe para representar a nave do jogador ativo.
var Navy = enchant.Class.create (enchant.Sprite, {
    initialize: function (x, y) {
        this.sizes = {
            normal: {width: 64, height: 64},
            special: {width: 64, height: 256}
        }
        enchant.Sprite.call(this, this.sizes.normal.width, this.sizes.normal.height);
        this.x = x;
        this.y = y;
        this.normalImage = game.assets[IMAGES.FLASH];
        this.specialImage = game.assets[IMAGES.FLASH_SPECIAL];
        this.animSpecial = ANIM_FRAMES.NAVY.FLASH_SPECIAL;
        this.image = this.normalImage;
        this.shotImage = game.assets[IMAGES.FLASH_SHOT];
        this.frame = ANIM_FRAMES.NAVY.IDLE;
        this.rateMaxCounter = 5;
        this.rateCounter = this.rateMaxCounter;
        this.dashMaxCounter = 80;
        this.dashCounter = this.dashMaxCounter;
        this.jumpMaxCounter = 50;
        this.jumpCounter = this.jumpMaxCounter;
        this.specialMaxCounter = 100;
        this.specialCounter = this.specialMaxCounter;
        this.damage = 1;
        this.specialDamage = 10;        
        this.speed = 5;
        this.frameCounter = 0;
        this.armor = 30;
        //--> É multiplicado pelo dano dos npc's para calcular o valor do ataque. Deve estar em porcento.
        this.shield = 1;
        this.specialShield = 0.1;
        this.shotConfig = [{
            xRelation: this.width/4,
            yRelation: this.height/2,
            image: this.shotImage,
            damage: this.damage,
            speed: -DEFAULT.SHOT_SPEED,
            parent: this
        },{
            xRelation: this.width * 3/4,
            yRelation: this.height/2,
            image: this.shotImage,
            damage: this.damage,
            speed: -DEFAULT.SHOT_SPEED,
            parent: this
        }];
        Layers.navys.addChild(this);        
        if (gameMode != GAME_MODE.SINGLE_PLAYER) {
            channel.send(JSON.stringify({task: TASK.NAVY.CREATE}));
            channel.send(JSON.stringify({task: TASK.NAVY.MOVE, x: this.x, y: this.y}));            
        }
    },
    updateShotConfig: function () {
        var _this = this;
        $(this.shotConfig).each(function (index, config) {
            config.image = _this.shotImage;
        });        
    },
    frameAnim: function (frames) {
        var frameDelay = 2;
        if (this.frameCounter == frames.length * frameDelay - 1) {
            this.frame = frames[frames.length - 1];
        } else {
            this.frame = SpriteMath.buildArray(frames, frameDelay);
            this.frameCounter++;
        }
        if (gameMode != GAME_MODE.SINGLE_PLAYER) {
            channel.send(JSON.stringify({task: TASK.NAVY.SET_FRAME, frame: this.frame}));
        }        
    },
    onenterframe: function () {
        var kLeft = game.input.kLeft;
        var kRight = game.input.kRight;
        var kUp = game.input.kUp;
        var kDown = game.input.kDown;
        var kA = game.input.kA;
        var kB = game.input.kB;
        var kC = game.input.kC;
        var kD = game.input.kD;
        var kPause = game.input.kPause;

        //--> Direcionais.
        //
        //
        //--> Esquerda ou direita.
        if (kLeft && !kRight) {            
            this.moveBy((this.x - this.speed > 0) ? -this.speed : -this.x, 0);
        } else if (!kLeft && kRight) {
            this.moveBy((this.x + this.speed + this.width < game.width) ? this.speed : 0, 0);
        }

        //--> Baixo ou cima.
        if (kDown && !kUp) {
            this.moveBy(0, (this.y + this.speed + this.height < game.height) ? this.speed : 0);
        } else if (!kDown && kUp) {
            this.moveBy(0, (this.y - this.speed > 0) ? -this.speed : -this.y);
        }            

        //--> Botões de comando.
        //
        //
        //--> Tiro básico.
        if (kA) {
            if (this.rateCounter == this.rateMaxCounter) {
                $(this.shotConfig).each(function (index, config) {
                    new Shot(config);
                });
                this.rateCounter = 0;
                if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                    channel.send(JSON.stringify({task: TASK.NAVY.SHOT}));                    
                }
            }
        }

        //--> Tiro especial.
        if (kB) {
            if (this.specialCounter == this.specialMaxCounter) {
                kC = false;
                kD = false;
                this.specialCounter = 0;
            }
        }

        //--> Acelerar: dash
        if (kC && !kD) {
            if (this.dashCounter == this.dashMaxCounter) {
                var dashSpeed = this.speed * 15;
                this.moveBy(0, (this.y - dashSpeed > 0) ? -dashSpeed : -this.y);
                if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                    channel.send(JSON.stringify({task: TASK.NAVY.MOVE, x: this.x, y: this.y}));
                }
                this.dashCounter = 0;
            }
        }

        //--> Jump.
        if (!kC && kD) {
            if (this.jumpCounter == this.jumpMaxCounter) {
                var originalSpeed = this.speed;
                this.speed *= 0.5;
                window.setTimeout(function (_this) {
                    _this.speed = originalSpeed;
                }, 1000 * this.jumpMaxCounter / game.fps + 1, this);
                this.jumpCounter = 0;
                if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                    channel.send(JSON.stringify({task: TASK.NAVY.JUMP}));                    
                }
            }
        }

        //--> Verificar alterações dos objetos e enviar o contexto para jogadores.
        if (gameMode != GAME_MODE.SINGLE_PLAYER) {
            if (kLeft || kRight || kDown || kUp || kA || kB || kC || kD) {
                channel.send(JSON.stringify({task: TASK.NAVY.MOVE, x: this.x, y: this.y}));
            }            
        }

        //--> Alterando sprites da nave.
        if ((kLeft || kRight || kDown || kUp || kA || kB || kC || kD) && (this.specialCounter > this.animSpecial.length)) {
            if (kA) {
                if (this.frame != ANIM_FRAMES.NAVY.SHOT) {
                    this.frame = ANIM_FRAMES.NAVY.SHOT;                    
                }
            } else if (!(kC || kD)) {
                if (kLeft && !kRight) {                    
                    this.frameAnim (ANIM_FRAMES.NAVY.LEFT);
                } else if (!kLeft && kRight) {
                    this.frameAnim (ANIM_FRAMES.NAVY.RIGHT);
                } else {
                    if (kUp && !kDown) {
                        this.frame = ANIM_FRAMES.NAVY.UP;
                    } else {
                        this.frame = ANIM_FRAMES.NAVY.IDLE;
                    }
                    this.frameCounter = 0;
                    if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                        channel.send(JSON.stringify({task: TASK.NAVY.SET_FRAME, frame: this.frame}));                    
                    }
                }                
            } else if (kC && !kD) {
                if (this.dashCounter == 0) {
                    if (kLeft && !kRight) {
                        this.frameAnim (ANIM_FRAMES.NAVY.DASH_LEFT);
                    } else if (!kLeft && kRight) {
                        this.frameAnim (ANIM_FRAMES.NAVY.DASH_RIGHT);
                    } else {
                        this.frame = ANIM_FRAMES.NAVY.DASH_UP;
                        this.frameCounter = 0;
                        if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                            channel.send(JSON.stringify({task: TASK.NAVY.SET_FRAME, frame: this.frame}));
                        }
                    }
                    this.tl.delay(4).then(function () {
                        this.frame = ANIM_FRAMES.NAVY.IDLE;
                        if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                            channel.send(JSON.stringify({task: TASK.NAVY.SET_FRAME, frame: this.frame}));
                        }                        
                    });
                }
            } else if (!kC && kD) {
                if (this.jumpCounter == 0) {
                    if (kLeft && !kRight) {
                        this.frameAnim (ANIM_FRAMES.NAVY.DASH_LEFT);
                    } else if (!kLeft && kRight) {
                        this.frameAnim (ANIM_FRAMES.NAVY.DASH_RIGHT);
                    } else {
                        this.frame = ANIM_FRAMES.NAVY.DASH_UP;
                        this.frameCounter = 0;
                        if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                            channel.send(JSON.stringify({task: TASK.NAVY.SET_FRAME, frame: this.frame}));
                        }
                    }
                    this.tl.delay(4).then(function () {
                        this.frame = ANIM_FRAMES.NAVY.IDLE;
                        if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                            channel.send(JSON.stringify({task: TASK.NAVY.SET_FRAME, frame: this.frame}));
                        }
                    });
                }
            }
        } else if (this.specialCounter < this.animSpecial.length) {
            this[this.special]();
        } else {
            this.frame = SpriteMath.buildArray(ANIM_FRAMES.NAVY.IDLE, 5);
            this.frameCounter = 0;
            if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                channel.send(JSON.stringify({task: TASK.NAVY.SET_FRAME, frame: this.frame}));
            }
        }

        //--> Contadores.
        this.rateCounter = (this.rateCounter > this.rateMaxCounter) ? this.rateMaxCounter : this.rateCounter + 1;
        this.specialCounter = (this.specialCounter > this.specialMaxCounter) ? this.specialMaxCounter : this.specialCounter + 1;
        this.dashCounter = (this.dashCounter > this.dashMaxCounter) ? this.dashMaxCounter : this.dashCounter + 1;
        this.jumpCounter = (this.jumpCounter > this.jumpMaxCounter) ? this.jumpMaxCounter : this.jumpCounter + 1;
    },
    specialFlash: function () {
        if (this.specialCounter == 0) {                    
            //--> Início do special.
            var yOffset = this.y - (this.sizes.special.height - this.height);
            this.image = this.specialImage;
            this.width = this.sizes.special.width;
            this.height = this.sizes.special.height;
            this.y = yOffset;
            this.frame = this.animSpecial;

            var speed = 300;
            var yOffset = (this.y - speed < 0) ? 0 : (this.y - speed);
            this.tl.moveBy(0, -yOffset, 6);
            this.tmpDamage = this.damage;
            this.damage = this.specialDamage;       
            this.tmpShield = this.shield;
            this.shield = this.specialShield;     
        } else if (this.specialCounter == this.animSpecial.length - 1) {
            //--> Fim do special.
            this.image = this.normalImage;
            this.frame = SpriteMath.buildArray(ANIM_FRAMES.NAVY.IDLE, 5);
            this.width = this.sizes.normal.width;
            this.height = this.sizes.normal.height;
            this.damage = this.tmpDamage;            
            this.tmpDamage = undefined;
            this.shield = this.tmpShield;     
            this.tmpShield = undefined;
        }
    },

    specialLion: function () {
        if (this.specialCounter == 0) {                    
            //--> Início do special.
            var yOffset = this.y - (this.sizes.special.height - this.height);
            this.image = this.specialImage;
            this.width = this.sizes.special.width;
            this.height = this.sizes.special.height;
            this.y = yOffset;            
            this.frame = this.animSpecial;
            this.tmpDamage = this.damage;
            this.damage = this.specialDamage;            
            this.tmpShield = this.shield;
            this.shield = this.specialShield;     
        } else if (this.specialCounter == this.animSpecial.length - 1) {
            //--> Fim do special.
            var yOffset = this.height;
            this.image = this.normalImage;
            this.frame = SpriteMath.buildArray(ANIM_FRAMES.NAVY.IDLE, 5);
            this.width = this.sizes.normal.width;
            this.height = this.sizes.normal.height;
            this.y += yOffset - this.height;
            this.damage = this.tmpDamage;            
            this.tmpDamage = undefined;
            this.shield = this.tmpShield;     
            this.tmpShield = undefined;
        }
    },

    //--> Retorna o sprite da nave, de acordo com o indice enviado.
    getNavyImageByIndex: function (index) {
        if (index == 0) {
            return IMAGES.LION;                
        } else if (index == 1) {
            return IMAGES.FLASH;
        }
    },
    //--> Retorna o sprite do special da nave, de acordo com o indice enviado.
    getSpecialImageByIndex: function (index) {
        if (index == 0) {
            return IMAGES.LION_SPECIAL;                
        } else if (index == 1) {
            return IMAGES.FLASH_SPECIAL;
        }
    },
    //--> Retorna o frameset do special da nave, de acordo com o indice enviado.
    getSpecialFramesetByIndex: function (index) {
        if (index == 0) {
            return ANIM_FRAMES.NAVY.LION_SPECIAL;                
        } else if (index == 1) {
            return ANIM_FRAMES.NAVY.FLASH_SPECIAL;
        }
    },
    //--> Retorna o nome do special da nave, de acordo com o indice enviado.
    getSpecialNameByIndex: function (index) {
        if (index == 0) {
            return "specialLion";
        } else if (index == 1) {
            return "specialFlash";
        }
    },
    applyDamage: function (damage) {
        this.armor -= parseInt(damage * this.shield);
        if (this.armor <= 0) {
            return this.destroy();
        } 
    },
    destroy: function () {                
        return Layers.navys.removeChild(this) + game.rootScene.removeChild(this) + main();
    }
});