
var Wave = function (npcs, dropItemsProb) {
    this.npcs = npcs;
    this.dropItemsProb = dropItemsProb;
    this.npcList = [];
    this.status = WAVE_STATUS.WAITING_START;
    this.rounds = 0;
    this.dropItemsCounter = 0;
    this.dropItemsTarget = 360;

    Wave.prototype.start = function () {
        if (DEBUG)
            console.log("Wave iniciando.", "Qtd NPC: " + this.npcs.length);        
        var self = this;
        this.statusLoop = new Label();
        this.statusLoop.onenterframe = function () {

            switch (self.status) {
                case WAVE_STATUS.WAITING_START:
                    break;

                case WAVE_STATUS.STARTING:
                    for (var i = 0; i < self.npcs.length; i++) {
                        self.npcList.push(new NPC(undefined, undefined, self.npcs[i]));
                    }
                    self.status = WAVE_STATUS.WAITING_COMBAT;
                    break;

                case WAVE_STATUS.WAITING_COMBAT:
                    if (gameStatus == GAME_STATUS.PLAYING) {
                        if (DEBUG)
                            console.log("Trazendo NPCs da Wave. Restam: ", self.npcList.length);
                        self.bringNpcs();
                        self.status = WAVE_STATUS.COMBATING;                        
                    }
                    break;

                case WAVE_STATUS.COMBATING:
                    self.removeDefeatedNpcs();

                    //--> Possui inimigos vivos para trazer para a tela.
                    if (self.npcList.length > 0) {
                        var hiddenAmount = 0;
                        for (var i in self.npcList) {
                            if (self.npcList[i].isHidden) {
                                hiddenAmount++;
                            }
                        }

                        if (hiddenAmount === self.npcList.length) {
                            self.status = WAVE_STATUS.WAITING_COMBAT;
                        }

                        if (dropItemsProb > 0 && GUI.currentDropItem == undefined) {
                            if (self.dropItemsCounter > self.dropItemsTarget) {
                                self.dropItems();
                                self.dropItemsCounter = 0;
                            } else {
                                self.dropItemsCounter++;
                            }
                        }

                    } else {
                        //--> Todos os inimigos da wave foram abatidos.
                        self.status = WAVE_STATUS.FINISHING;
                    }
                    break;

                case WAVE_STATUS.FINISHING:
                    self.finish();
                    break;

                case WAVE_STATUS.FINISHED:
                    break;
            }
        };
        game.rootScene.addChild(this.statusLoop);
    };

    Wave.prototype.finish = function () {
        this.statusLoop.onenterframe = undefined;
        game.rootScene.removeChild(this);
        if (DEBUG)
            console.log("Wave finalizando.");
        this.status = WAVE_STATUS.FINISHED;
    };

    Wave.prototype.removeDefeatedNpcs = function () {            
        for (var i = 0; i < this.npcList.length; i++) {
            if (this.npcList[i].isDefeated) {
                this.npcList.splice(i, 1);
                i--;
            }
        }
    };

    Wave.prototype.bringNpcs = function () {
        var delayStartPath = 30;
        var delayBetweenMoves = 40;
        var randPath = Math.floor(Math.random() * NPC_PATH.length);
        var path = NPC_PATH.toArray()[randPath];
        this.rounds++;

        for (var i = 0; i < this.npcList.length; i++) {
            this.npcList[i].movePath(path, delayStartPath + i * delayBetweenMoves);
        }
    };

    Wave.prototype.dropItems = function () {
        var randProb = Math.random();

        if (randProb < this.dropItemsProb) {
            var randIndex = Math.floor(Math.random() * ITEMS.length);
            var itemAttr = ITEMS.get(randIndex);
            var direction = Math.pow(-1, Math.floor(Math.random() * 2));//-1 ou 1
            var y = Math.floor(Math.random() * game.height * 0.20) + 0.05 * game.height;
            GUI.currentDropItem = new Item(direction, y, itemAttr);
        }
    };
};