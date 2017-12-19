var GUI = {
    fgNavyLifeLabel: undefined,
    labelScore: undefined,
    score: 0,
    navy: undefined,
    currentItem: undefined,
    moveNextTarget: false,
    enemiesDefeated: 0,

    addButton: function (resource, rect, action) {
        var delay = Math.floor(Math.random() * 30) + 60;
        var button = new Sprite(rect.width, rect.height);
        button.image = game.assets[resource];
        button.x = rect.x;
        button.y = rect.y;
        
        button.ontouchstart = function () {
            button.scale(0.95);
        };
        button.ontouchend = function () {
            //game.assets[RESOURCE.getPath("SOUND", "[click_button]")].play();
            button.scale(1.05);
            (action != undefined) ? action() : undefined;
        };

        button.tl.scaleTo(1.05,1.05,delay).scaleTo(0.98,0.98,delay - 20).scaleTo(1.02,1.02,delay - 10).scaleTo(1,1,delay - 30).delay(delay / 2).loop();
        game.rootScene.addChild(button);            
        return button;
    },
    addImage: function (resource, rect) {
        var sprite = new Sprite(rect.width, rect.height);
        sprite.image = game.assets[resource];
        sprite.x = rect.x;
        sprite.y = rect.y;
        game.rootScene.addChild(sprite);
        return sprite;
    },
    addText: function (text, rect) {
        var label = new Label(text);
        label.x = rect.x;
        label.y = rect.y;
        label.width = rect.width;
        label.height = rect.height;
        label.font = "18px " + FONT_FACE;
        game.rootScene.addChild(label);
        return label;
    },
    addList: function (items, rect) {
        var label = GUI.addText(items[0], new Rect(rect.x + 30, rect.y + 11, rect.width, rect.height - 20));
        var buttonBack = GUI.addButton(11, new Rect(rect.x, rect.y, 40, 40), function () {label.back();});
        var buttonForward = GUI.addButton(3, new Rect(rect.x + rect.width + 20, rect.y, 40, 40), function () {label.next();});

        label.back = function () {
            if (this.selectedIndex == 0)
                this.selectedIndex = this.items.length - 1;
            else
                this.selectedIndex--;

            this.text = this.items[this.selectedIndex];
        };

        label.next = function () {
            if (this.selectedIndex == this.items.length - 1)
                this.selectedIndex = 0;
            else
                this.selectedIndex++;
            
            this.text = this.items[this.selectedIndex];
        };

        label.select = function (index) {
            this.selectedIndex = index;
            this.text = this.items[this.selectedIndex];  
        };
        
        label.font = "bold 14px " + FONT_FACE;
        label.textAlign = "center";
        label.items = items;
        label.backgroundColor = "#bbd";
        label.color = "black";
        label.selectedIndex = 0;
        return {"buttonBack": buttonBack, "buttonForward" : buttonForward, "label" : label};
    },
    addArc: function (color, circle) {
        var sprite = new Sprite(circle.width, circle.height);
        sprite.x = circle.centerX;
        sprite.y = circle.centerY;
        sprite.circle = circle;
        sprite.color = color;

        sprite.redraw = function (startAngle, endAngle) {
            var surface = new Surface(sprite.circle.width, sprite.circle.height);
            startAngle = (startAngle == undefined) ? 0 : startAngle;
            endAngle = (endAngle == undefined) ? Math.PI * 2 : endAngle;
            
            surface.context.fillStyle = sprite.color;
            surface.context.beginPath();
            surface.context.moveTo(sprite.circle.ray, sprite.circle.ray);
            surface.context.arc(sprite.circle.ray, sprite.circle.ray, sprite.circle.ray, startAngle, endAngle, true);
            surface.context.closePath();            
            surface.context.fill();
            sprite.image = surface;
        };

        sprite.redraw();
        game.rootScene.addChild(sprite);
        return sprite;
    },
    addNavyLifeLabel: function () {
        var bgLifeLabel = new Label();
        bgLifeLabel.width = NAVY_LIFE.POSITION.WIDTH * game.width;
        bgLifeLabel.height = NAVY_LIFE.POSITION.HEIGHT * game.height;
        bgLifeLabel.x = NAVY_LIFE.POSITION.LEFT * game.width;
        bgLifeLabel.y = NAVY_LIFE.POSITION.TOP * game.height;
        bgLifeLabel.backgroundColor = NAVY_LIFE.BGCOLOR;

        var fgNavyLifeLabel = new Label();
        fgNavyLifeLabel.width = NAVY_LIFE.POSITION.WIDTH * game.width;
        fgNavyLifeLabel.height = NAVY_LIFE.POSITION.HEIGHT * game.height + 0.50;
        fgNavyLifeLabel.x = NAVY_LIFE.POSITION.LEFT * game.width;
        fgNavyLifeLabel.y = NAVY_LIFE.POSITION.TOP * game.height - 0.25;
        fgNavyLifeLabel.backgroundColor = NAVY_LIFE.FGCOLOR;

        fgNavyLifeLabel.update = function (life, maxLife) {
            if (maxLife > NAVY_LIMIT.LIFE) {
                bgLifeLabel.width = maxLife * game.width * 0.01;
            }
            this.width = (life / maxLife) * bgLifeLabel.width;
        };

        fgNavyLifeLabel.start = function (life, maxLife) {
            if (maxLife > NAVY_LIMIT.LIFE) {
                bgLifeLabel.width = maxLife * game.width * 0.01;
            }
            this.width = 0;
            this.tl.tween({width: (life / maxLife) * bgLifeLabel.width, time: 80});
        };

        game.rootScene.addChild(bgLifeLabel);
        game.rootScene.addChild(fgNavyLifeLabel);
        this.fgNavyLifeLabel = fgNavyLifeLabel;
    },
    addMovementButton: function (rect, actionDown, actionUp) {
        var button = new Sprite(rect.width, rect.height);
        button.x = rect.x;
        button.y = rect.y;
        button.backgroundColor = "#ccc";
        button.opacity = 0.20;
        button.ontouchstart = function () {
            button.opacity = 0.15;
            button.scale(0.995);
            (actionDown != undefined) ? actionDown() : undefined;
        };
        button.ontouchend = function () {
            button.opacity = 0.20;
            button.scale(1.005);
            (actionUp != undefined) ? actionUp() : undefined;
        };
        game.rootScene.addChild(button);            
        return button;
    },    
    addShotLayer: function () {
        game.shotLayer = new Group();
        game.shotLayer.x = 0;
        game.shotLayer.y = 0;
        game.shotLayer.width = game.width;
        game.shotLayer.height = game.height;
        game.rootScene.addChild(game.shotLayer);
    },    
    addMessage: function (message, color, delayRead) {
        var width = 200;
        var delayRead = delayRead || 60;
        var label = GUI.addText(message, new Rect((game.width - width) / 2, game.height / 2 - 20, width, 25));
        label.visible = false;
        label.color = color || "#F39C12";
        label.textAlign = "center";
        label.font = "16px " + FONT_FACE;
        label.tl
            .scaleTo(1.4, 0.15, 1)
            .then(function () {label.visible = true;})
            .scaleTo(1, 1, 10)
            .delay(delayRead)
            .scaleTo(1.4, 0.15, 10)
            .then(function () {game.rootScene.removeChild(label);});
    },
    addStars: function (amount) {
        var x = STARS.POSITION.LEFT * game.width;
        var y = STARS.POSITION.TOP * game.height;
        var width = 16;
        var height = 16;

        for (var i = 0; i < amount; i++) {
            GUI.addImage(RESOURCE.getPath("IMAGE", "star"), new Rect(x + i * width, y, width, height));
        }
    },
    onExitCombat: function () {
        GUI.onMain();        
    },
    onPauseCombat: function (background, labelPause) {
        gameStatus = GAME_STATUS.PAUSED;
        background.opacity = 0.5;
        background.backgroundColor = "black";
        labelPause.visible = true;
    },
    onResumeCombat: function (background, labelPause) {
        gameStatus = GAME_STATUS.PLAYING;
        background.opacity = 1;
        background.backgroundColor = "white";
        labelPause.visible = false;
    },
    onToggleAction: function (background, labelPause) {
        if (gameStatus == GAME_STATUS.PAUSED) {
            GUI.onResumeCombat(background, labelPause);
        } else if (gameStatus == GAME_STATUS.PLAYING) {
            GUI.onPauseCombat(background, labelPause);
        }        
    },
    onBeforeStartCombat: function () {
        var width = 150;
        var delayRead = 60;
        var label = GUI.addText(MESSAGE.PHASE.GET_READY, new Rect((game.width - width) / 2, game.height / 2 - 20, width, 25));
        label.color = "#F39C12";
        label.textAlign = "center";
        label.font = "18px strong " + FONT_FACE;
        label.tl
            .delay(delayRead).then(function () {label.text = "..3";})
            .delay(delayRead).then(function () {label.text = "..2";})
            .delay(delayRead).then(function () {label.text = "..1";})
            .delay(delayRead).then(function () {label.text = MESSAGE.PHASE.GO;})
            .delay(delayRead).then(function () {
                game.rootScene.removeChild(label);
                gameStatus = GAME_STATUS.PLAYING;
            });
    },
    onFinishCombat: function (isWinner) {
        gameStatus = GAME_STATUS.FINISHING;
        var delayRead = 120;
        var side = 1.5 * game.height;
        var rectFog = new Rect(game.width / 2 - side / 2, game.height + side / 2, side, side);
        var fog = new Background(rectFog, "#000", 0.9);

        if (isWinner) {
            GUI.addMessage(MESSAGE.PHASE.SUCCESS, "#27AE60", delayRead);
            GUI.navy.tl.delay(delayRead).moveBy(0, -game.height, 30);
            fog.rotate(45);
            fog.tl.delay(delayRead + 10).moveBy(0, -(game.height + side * 0.65), 30).then(function () {
                fog.opacity = 1;
                playerStats.phase++;            
                playerStats.score += GUI.score;
                playerStats.enemiesDefeated += GUI.enemiesDefeated;
                updatePlayerStats();
                GUI.moveNextTarget = true;
                GUI.onMain();
            });            
        } else {
            GUI.addMessage(MESSAGE.PHASE.FAIL, "#AE2760", delayRead);            
            fog.tl.delay(delayRead + 50).then(function () {
                GUI.moveNextTarget = false;
                GUI.onMain();
            });            
        }
    },
    onStartCombat: function () {
        gameStatus = GAME_STATUS.PAUSED;
        GUI.clear();
        if (DEBUG)
            console.log("Inicio de fase.");

        var rectButtonMovementLeft = new Rect(BUTTON_MOVEMENT.LEFT * game.width, BUTTON_MOVEMENT.TOP * game.height, BUTTON_MOVEMENT.WIDTH * game.width, BUTTON_MOVEMENT.HEIGHT * game.height);
        var rectButtonMovementRight = new Rect((1 - BUTTON_MOVEMENT.LEFT - BUTTON_MOVEMENT.WIDTH) * game.width, BUTTON_MOVEMENT.TOP * game.height, BUTTON_MOVEMENT.WIDTH * game.width, BUTTON_MOVEMENT.HEIGHT * game.height);        
        var rectWaves = new Rect((1 - NAVY_LIFE.POSITION.LEFT) * game.width - 110, NAVY_LIFE.POSITION.TOP * game.height - 25, 100, NAVY_LIFE.POSITION.HEIGHT * game.height);
        var rectBackground = new Rect(0, 0, game.width, 2 * game.height);
        var rectScore = new Rect(10, 10, 200, 20);

        //--> Lógica para controlar as waves.
        var waveManagerLoop = new Label();
        var wave = undefined;        
        var delayWaveManager = 80;//--> Executar de x em x segundos.
        var phases = PHASES[playerStats.phase - 1];
        var waveCounter = 0;
        var maxWaves = phases.length;        
        var backgroundLimit = -game.height;            

        //--> A ordem das linhas desse trecho é crucial.
        var background = GUI.addImage(RESOURCE.getPath("IMAGE", "background"), rectBackground);
        GUI.addShotLayer();
        GUI.addMovementButton(rectButtonMovementLeft, function () {game.input.moveLeft = true;}, function () {game.input.moveLeft = false;});
        GUI.addMovementButton(rectButtonMovementRight, function () {game.input.moveRight = true;}, function () {game.input.moveRight = false;});
        GUI.addNavyLifeLabel();
        GUI.navy = new Navy(game.width / 2, BUTTON_MOVEMENT.TOP * game.height - 128);        
        var labelWaves = GUI.addText("", rectWaves);
        GUI.labelScore = GUI.addText(MESSAGE.PHASE.SCORE + "0", rectScore);
        var stars = GUI.navy.upgrade(playerStats.phase);
        GUI.fgNavyLifeLabel.start(GUI.navy.life, GUI.navy.life);
        GUI.addStars(stars);
        var labelPause = GUI.addText(MESSAGE.PHASE.PAUSE, new Rect((game.width - 200) / 2, game.height / 2 - 80, 200, 25));

        labelPause.color = "rgba(255,255,255,0.7)";
        labelPause.visible = false;
        labelPause.textAlign = "center";

        labelWaves.color = "#fff";
        labelWaves.textAlign = "right";
        labelWaves.font = "bold 42px " + FONT_FACE;

        GUI.labelScore.color = "#fff";
        GUI.labelScore.textAlign = "left";
        GUI.labelScore.font = "18px " + FONT_FACE;
        GUI.score = 0;
        GUI.enemiesDefeated = 0;
        GUI.labelScore.update = function (score) {
            GUI.score += score; 
            GUI.labelScore.text = MESSAGE.PHASE.SCORE + parseInt(GUI.score);
        };

        background.y = backgroundLimit;
        var delayActionTarget = 10;
        var delayActionCounter = delayActionTarget;

        waveManagerLoop.onenterframe = function () {

            if (wave != undefined) {
                if (game.input.action && delayActionCounter == delayActionTarget) {
                    GUI.onToggleAction(background, labelPause);
                    delayActionCounter = 0;
                } else {
                    if (delayActionCounter < delayActionTarget)
                        delayActionCounter++;
                } 
            }

            //--> Movendo o fundo.
            if (background.y >= 0) {
                background.y = backgroundLimit;
            } else {
                background.y += BACKGROUND_SPEED;
            }                

            if (gameStatus == GAME_STATUS.PLAYING && this.age % delayWaveManager == 0) {

                if (wave != undefined) {
                    switch (wave.status) {
                        case WAVE_STATUS.WAITING_START:
                            wave.status = WAVE_STATUS.STARTING;
                            wave.start();
                        break;
                        case WAVE_STATUS.FINISHED:
                            wave = undefined;

                            //--> Verificando se a última wave foi executada.
                            if (waveCounter == maxWaves) {
                                waveManagerLoop.onenterframe = undefined;
                                GUI.onFinishCombat(true);
                                return true;
                            }
                        break;
                    }
                } else {
                    if (waveCounter < maxWaves - 1) {
                        GUI.addMessage(MESSAGE.WAVE.START);
                    } else {
                        GUI.addMessage(MESSAGE.WAVE.LAST);
                    }
                    wave = new Wave(phases[waveCounter].NPCS, phases[waveCounter].DROP_ITEM);
                    waveCounter++;
                    labelWaves.text = waveCounter + "/" + maxWaves;
                    GUI.navy.increaseLife(NAVY_LIFE_FINISHED_WAVE);
                }
            }            
        };
        game.rootScene.addChild(waveManagerLoop);
        GUI.onBeforeStartCombat();
    },
    moveNext: function (pin, nextPhase) {
        var x = PHASES_MAP[nextPhase].x * game.width;
        var y = PHASES_MAP[nextPhase].y * game.height;

        pin.tl.moveTo(x + MAP_PIN.OFFSET_X, y + MAP_PIN.OFFSET_Y, 50);
    },
    onMain: function () {
        gameStatus = GAME_STATUS.MAIN_SCREEN;
        GUI.clear();
        var x, y, target, pin, phase;
        var bg = new Background(new Rect(0, 0, game.width, game.height), BACKGROUND_COLOR);
        var startButton = GUI.addButton(RESOURCE.getPath("IMAGE", "start_button"), new Rect(game.width / 2 - 45, 400, 90, 35), GUI.onStartCombat);
        var scoreLabel = GUI.addText(MESSAGE.MAIN.SCORE + playerStats.score, new Rect(10, 10, 200, 20));
        phase = parseInt(playerStats.phase);
        phase = Math.max(0, phase - 1);

        for (var i in PHASES_MAP) {
            x = PHASES_MAP[i].x * game.width;
            y = PHASES_MAP[i].y * game.height;
            target = GUI.addImage(RESOURCE.getPath("IMAGE", "target1"), new Rect(x, y, 32, 32));
            if (i < phase) {
                target.opacity = 0.50;
            }
        }        

        phase = (GUI.moveNextTarget === true) ? phase - 1 : phase;
        x = PHASES_MAP[phase].x * game.width;
        y = PHASES_MAP[phase].y * game.height;        
        pin = GUI.addImage(RESOURCE.getPath("IMAGE", "navy1"), new Rect(x + MAP_PIN.OFFSET_X, y + MAP_PIN.OFFSET_Y, 64, 64));
        pin.frame = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,2];

        if (GUI.moveNextTarget === true) {
            GUI.moveNext(pin, phase + 1);
            GUI.moveNextTarget = false;
        }

        startButton.onenterframe = function () {
            if (game.input.action) {
                GUI.onStartCombat();
                startButton.onenterframe = undefined;
            }
        };
    },
    clear: function () {
        var attempts = game.rootScene.childNodes.length + 1;
        while (game.rootScene.childNodes.length > 0 && attempts-- > 0) {
            game.rootScene.removeChild(game.rootScene.childNodes[0]);
        }
    }
};