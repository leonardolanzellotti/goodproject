var GUI = {
    puzzleConfig: {"dificulty" : 0, "sourceLanguage" : 0, "targetLanguage" : 0, "category" : 0},

    addButton: function (buttonFrame, rect, action) {
        var delay = Math.floor(Math.random() * 30) + 60;
        var button = new Sprite(rect.width, rect.height);
        button.image = game.assets[RESOURCE.getPath("IMAGE", "button1.png")];
        button.x = rect.x;
        button.y = rect.y;
        button.frame = buttonFrame;
        
        button.ontouchstart = function () {
            button.scale(0.95);
        };
        button.ontouchend = function () {
            game.assets[RESOURCE.getPath("SOUND", "[click_button]")].play();
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
        
        label.font = "bold 14px Arial";
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
    onExitPuzzle: function () {
        GUI.onMain();
    },
    onRestartPuzzle: function () {
        GUI.onStartPuzzle();
    },
    onBeforeStartPuzzle: function () {
        gameStatus = GAME_STATUS.PAUSED;

        var bg = new Background(new Rect(0, 0, game.width, game.height), "#000", 0.65);
        var bgStrip = new Background(new Rect(0, -80, game.width, 80), "#eee");
        var imageStrip = GUI.addImage(RESOURCE.getPath("IMAGE", "striped1"), new Rect(0, 320, game.width, 20));
        var labelStart = GUI.addText("Vamos começar?! ;)", new Rect(50, 270, 200, 30));

        var buttonStart = GUI.addButton(5, new Rect(400, 300, 40, 40), function () {
            game.rootScene.removeChild(imageStrip);
            game.rootScene.removeChild(buttonStart);
            game.rootScene.removeChild(labelStart);
            
            bgStrip.tl.moveTo(bgStrip.x, -bgStrip.height, 6).then(function () {
                //--> Iniciando o Puzzle!!
                game.rootScene.removeChild(bg);
                gameStatus = GAME_STATUS.PLAYING;
                game.assets[RESOURCE.getPath("SOUND", "[start]")].play();
            });
        });

        labelStart.color = "#2980b9";
        labelStart.textAlign = "center";
        labelStart.font = "bold 20px Arial, Sans-Serif, Helvetica";

        buttonStart.visible = false;
        labelStart.visible = false;
        imageStrip.visible = false;

        bgStrip.tl.delay(10).moveTo(bgStrip.x, 240, 5).then(function () {
            imageStrip.visible = true;
            buttonStart.visible = true;
            labelStart.visible = true;
        });
    },
    onFinishPuzzle: function (isWinner) {
        gameStatus = GAME_STATUS.FINISH_ROUND;
        var score = Puzzle.getScore();
        var roundTime = ROUND_TIME[DIFICULTIES[GUI.puzzleConfig.dificulty].value];
        var bg = new Background(new Rect(0, 0, game.width, game.height), "#000", 0.65);
        var bgStats = new Background(new Rect(100, -250, game.width - 200, 320), "#eee");
        var bgBorderStats = new Background(new Rect(103, 184, game.width - 206, 283), "#dde");
        var buttonRestart = GUI.addButton(4, new Rect(280, 410,40,40), function () {GUI.onRestartPuzzle();});
        var buttonExit = GUI.addButton(14, new Rect(320, 410,40,40), function () {GUI.onExitPuzzle();});        
        var labelResult = GUI.addText("", new Rect(103, 153, game.width - 206, 28));
        var labelHits = GUI.addText("Palavras encontradas: " + Puzzle.scopeTable.hits + " / " + Puzzle.scopeTable.totalWords, new Rect(-300, 190, game.width - 240, 30));
        var labelTimer = GUI.addText("Tempo restante: " + (roundTime - Puzzle.currentTime), new Rect(game.width, 215, game.width - 240, 30));
        var labelScore = GUI.addText("Pontuação: " + "0000".concat(score).slice(-4), new Rect(-300, 240, game.width - 240, 30));
        var labelHighScore = GUI.addText("Novo recorde! " + "0000".concat(score).slice(-4), new Rect(110, 420, 150, 30));

        if (isWinner) {
            game.assets[RESOURCE.getPath("SOUND", "[win]")].play();
            labelResult.text = "Parabéns!!! :D";
            labelResult.backgroundColor = "#1abc9c";
        } else {
            game.assets[RESOURCE.getPath("SOUND", "[loss]")].play();
            labelResult.text = "Aaah seu tempo acabou.. :(";
            labelResult.backgroundColor = "#cb4335";
        }

        labelResult.textAlign = "center";
        labelResult.font = "bold 20px Arial";
        labelHits.textAlign = "center";
        labelHits.font = "16px Arial";
        labelTimer.textAlign = "center";
        labelTimer.font = "16px Arial";
        labelScore.textAlign = "center";
        labelScore.font = "16px Arial";
        labelHighScore.textAlign = "left";
        labelHighScore.font = "18px Arial";
        labelHighScore.color = "#f00";

        bgBorderStats.visible = false;
        buttonRestart.visible = false;
        buttonExit.visible = false;
        labelHits.visible = false;
        labelTimer.visible = false;
        labelScore.visible = false;
        labelResult.visible = false;
        labelHighScore.visible = false;

        bgStats.tl.moveTo(100, 150, 7).then(function () {
            labelHits.moveTo(-300, labelHits.y);
            labelTimer.moveTo(game.width, labelTimer.y);
            labelScore.moveTo(-300, labelScore.y);

            bgBorderStats.visible = true;
            buttonRestart.visible = true;
            buttonExit.visible = true;
            labelHits.visible = true;
            labelTimer.visible = true;
            labelScore.visible = true;
            labelResult.visible = true;

            labelHits.tl.delay(80).then(function () {game.assets[RESOURCE.getPath("SOUND", "[stats]")].play();}).moveTo(120, labelHits.y, 5);
            labelTimer.tl.delay(110).then(function () {game.assets[RESOURCE.getPath("SOUND", "[stats]")].play();}).moveTo(120, labelTimer.y, 5);
            labelScore.tl.delay(140).then(function () {game.assets[RESOURCE.getPath("SOUND", "[stats]")].play();}).moveTo(120, labelScore.y, 5);
            bgStats.tl.delay(175).then(function () {
                //--> Jogador alcançou o seu recorde!
                if (score >= playerStats.highScore) {
                    game.assets[RESOURCE.getPath("SOUND", "[record_reached]")].play();
                    playerStats.highScore = score;
                    playerStats.time = roundTime - Puzzle.currentTime;
                    playerStats.category = GUI.puzzleConfig.category;
                    labelHighScore.tl.then(function () {labelHighScore.color = "#0f0";}).delay(20).then(function () {labelHighScore.color = "#f00";}).delay(20).loop();
                    labelHighScore.visible = true;
                    updatePlayerStats();
                };
            });
        });
    },
    onStartPuzzle: function () {
        gameStatus = GAME_STATUS.PAUSED;
        GUI.clear();
        Puzzle.init();

        var roundTime = ROUND_TIME[DIFICULTIES[GUI.puzzleConfig.dificulty].value];
        var zeroAngle = -Math.PI / 2;
        var timerConstAngle = Math.PI * 2 / roundTime;
        var buttonRestart = GUI.addButton(4, new Rect(game.width - 45,50,40,40), function () {if (gameStatus == GAME_STATUS.PLAYING) GUI.onRestartPuzzle();});
        var buttonExit = GUI.addButton(14, new Rect(game.width - 45,90,40,40), function () {if (gameStatus == GAME_STATUS.PLAYING) GUI.onExitPuzzle();});
        var bgTimer = GUI.addArc(BG_TIMER_COLOR, new Circle(17, game.width - 45, 10));
        var fgTimer = GUI.addArc(FG_TIMER_COLOR, new Circle(17, game.width - 45, 10));
        var glossary = Puzzle.randGlossary(PUZZLE_CONTENT[GUI.puzzleConfig.category].words);
        var currentSecond = 0;
        
        fgTimer.onenterframe = function () {
            if ((gameStatus == GAME_STATUS.PLAYING) && (this.age % game.fps == 0)) {
                currentSecond++;
                Puzzle.currentTime = currentSecond;
                
                if (Puzzle.scopeTable.hits == Puzzle.scopeTable.totalWords) {
                    GUI.onFinishPuzzle(true);
                    fgTimer.onenterframe = undefined;
                } else {

                    if (currentSecond < roundTime) {
                        var timerAngle = timerConstAngle * currentSecond + zeroAngle;
                        this.redraw(zeroAngle, timerAngle);
                        bgTimer.tl.scaleTo(1.1,1.1,8).scaleTo(0.97,0.97,10).scaleTo(1.05,1.05,7).scaleTo(1,1,9);
                        fgTimer.tl.scaleTo(1.1,1.1,8).scaleTo(0.97,0.97,10).scaleTo(1.05,1.05,7).scaleTo(1,1,9);

                        if (roundTime - currentSecond <= 10 && Puzzle.scopeTable.hits != Puzzle.scopeTable.totalWords) {
                            game.assets[RESOURCE.getPath("SOUND", "[stats]")].play();
                        }
                    } else if (currentSecond == roundTime) {
                        this.redraw(zeroAngle, timerAngle - 1);
                        GUI.onFinishPuzzle(false);
                        fgTimer.onenterframe = undefined;
                    }                    
                }

                if (DEBUG)
                    console.log("Round Timer: ", currentSecond);
            }
        };

        MetadataService.translate(glossary, LANGUAGES[GUI.puzzleConfig.sourceLanguage].value, LANGUAGES[GUI.puzzleConfig.targetLanguage].value)
            .success(function (response) {  
                Puzzle.start(response, LANGUAGES[GUI.puzzleConfig.sourceLanguage].value, LANGUAGES[GUI.puzzleConfig.targetLanguage].value, DIFICULTIES[GUI.puzzleConfig.dificulty].value);
                GUI.onBeforeStartPuzzle();
            }).error(function (response) {
                setTimeout(GUI.onStartPuzzle, 3000);
                console.log("Tentando novamente..", response);
            });
    },
    onMain: function () {
        gameStatus = GAME_STATUS.MAIN_SCREEN;
        GUI.clear();        

        var bg = new Background(new Rect(0, 0, game.width, game.height), BACKGROUND_COLOR);
        var left = 260;
        var top = 420;
        var width = 110;
        var height = 40;
        var listSourceLanguage = GUI.addList(LANGUAGES.map(function (element) {return element.text;}), new Rect(left, top, width, height));
        var listTargetLanguage = GUI.addList(LANGUAGES.map(function (element) {return element.text;}), new Rect(left, top + 40, width, height));
        var listDificulty = GUI.addList(DIFICULTIES.map(function (element) {return element.text;}), new Rect(left, top + 80, width, height));
        var listCategory = GUI.addList(PUZZLE_CONTENT.map(function (element) {return element.category;}), new Rect(left, top + 120, width, height));
        var labelHighScore = GUI.addText("Recorde: " + "0000".concat(playerStats.highScore).slice(-4), new Rect(20, game.height - 40, 150, 30));
        var buttonStart = GUI.addButton(1, new Rect(left + 130, top + 170, 40, height), function () {
            GUI.puzzleConfig.sourceLanguage = listSourceLanguage.label.selectedIndex;
            GUI.puzzleConfig.targetLanguage = listTargetLanguage.label.selectedIndex;
            GUI.puzzleConfig.dificulty = listDificulty.label.selectedIndex;
            GUI.puzzleConfig.category = listCategory.label.selectedIndex;

            GUI.onStartPuzzle();
        });

        listSourceLanguage.label.select(GUI.puzzleConfig.sourceLanguage);
        listTargetLanguage.label.select(GUI.puzzleConfig.targetLanguage);
        listDificulty.label.select(GUI.puzzleConfig.dificulty);
        listCategory.label.select(GUI.puzzleConfig.category);
        labelHighScore.font = "22px Arial";
        labelHighScore.textAlign = "left";
        labelHighScore.color = "#f00";
    },
    clear: function () {
        var attempts = game.rootScene.childNodes.length + 1;
        while (game.rootScene.childNodes.length > 0 && attempts-- > 0) {
            game.rootScene.removeChild(game.rootScene.childNodes[0]);
        }
    }
};