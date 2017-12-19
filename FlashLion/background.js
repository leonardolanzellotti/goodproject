//--> Classe para representar um background de fase.
var Background = enchant.Class.create (enchant.Sprite, {
    initialize: function (source) {
        enchant.Sprite.call(this, source.width, source.height);
        this.source = source;
        this.x = this.source.x;
        this.y = this.source.y;
        this.image = this.source.source.image;
        this.frame = 0;
        this.isStarted = false;
        this.stackedLayers = [];
        this.sourceStackedLayers = [this.source.destructibles, this.source.enemies];
        this.percent = 0;
        Layers.backgrounds.addChild(this);
    },
    stackLayer: function (layer) {
        layer.x = this.x;
        layer.y = this.y;
        layer.width = this.width;
        layer.height = this.height;
        this.stackedLayers.push(layer);
        if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
            channel.send(JSON.stringify({task: TASK.STACKED_LAYER.CREATE, name: layer.name}));
        }
    },
    onenterframe: function () {
        if (this.isStarted && gameMode != GAME_MODE.MULTI_PLAYER_CLIENT) {

            var sendUpdates = false;
            if (this.y + this.source.speed < 0) {
                this.moveBy(0, this.source.speed);
                sendUpdates = true;
            } else if (this.y > 0) {
                this.y = 0;
                if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
                    channel.send(JSON.stringify({task: TASK.BACKGROUND.MOVE, x: this.x, y: this.y}));                    
                }
            }
            
            if (sendUpdates) {
                if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
                    channel.send(JSON.stringify({task: TASK.BACKGROUND.MOVE, x: this.x, y: this.y}));                    
                }

                //--> Verificar se há algum objeto para ser adicionado no game.
                $(this.sourceStackedLayers).each(function (iLayer, layer) {
                    $(layer).each(function (index, element) {
                        if (Math.abs(-element.y - background.y) < background.source.speed) {
                            var x = (element.x != undefined) ? element.x : Math.random() * (game.width - element.item.width);
                            new window[element.item.class](x, element.y, element.item);                             
                            if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
                                channel.send(JSON.stringify({task: TASK.DESTRUCTIBLE.CREATE, item: element.item, x: x, y: element.y}));
                            }
                            layer.splice(index, 1);
                        }
                    });
                });                

                //--> Atualizar a posição das Layers empilhadas.
                $(this.stackedLayers).each(function (index, layer) {
                    layer.moveTo(background.x, background.y);
                    if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
                        channel.send(JSON.stringify({task: TASK.STACKED_LAYER.MOVE, name: layer.name, x: layer.x, y: layer.y}));                                        
                    }
                });                
            }
        }
    },
    move: function (x, y) {
        this.moveTo(x, y);
    },
    moveStackedLayer: function (name, x, y) {
        $(this.stackedLayers).each(function (index, layer) {
            if (layer.name == name) {
                layer.moveTo(x, y);
                return false;                
            }
        });
    },
    start: function () {
        this.isStarted = true;
    }
});