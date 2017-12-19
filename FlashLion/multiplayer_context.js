
//--> Classe estática para representar um contexto de informações das pontas das 
//--> instâncias de Channel.
var MultiplayerContext = {
	//--> Atualizar o contexto com as informações que vieram do socket.
	update: function (context)	 {

		var puppetPlayer = Layers.navys.childNodes[1];

        createPuppetNavy = function () {
            if (!puppetPlayer) {
                puppetPlayer = new PuppetNavy();
            }
        };

        switch (context.task) {
            case TASK.NAVY.CREATE:
                createPuppetNavy();
                if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
                    var inversedChosenNavy = (chosenNavy + 1) % 2;
                    puppetPlayer.image = game.assets[Navy.prototype.getNavyImageByIndex(inversedChosenNavy)];
                    puppetPlayer.shotImage = game.assets[Shot.prototype.getNavyShotImageByIndex(inversedChosenNavy)];                        
                    puppetPlayer.updateShotConfig();

                    channel.send(JSON.stringify({task: TASK.NAVY.TYPE, value: chosenNavy}));
                }
            break;
            case TASK.NAVY.MOVE:
                createPuppetNavy();
                puppetPlayer.move(context.x, context.y);
            break;
            case TASK.NAVY.SHOT:
                createPuppetNavy();
                puppetPlayer.shot();
            break;
            case TASK.NAVY.JUMP:
                createPuppetNavy();
                puppetPlayer.jump();
            break;
            case TASK.NAVY.DASH:
                createPuppetNavy();
                puppetPlayer.dash();
            break;
            case TASK.BACKGROUND.MOVE:
                background.move(context.x, context.y);                    
            break;
            case TASK.STACKED_LAYER.CREATE:
                background.stackLayer(Layers[context.name]);
            break;
            case TASK.STACKED_LAYER.MOVE:
                background.moveStackedLayer(context.name, context.x, context.y);
            break;                
            case TASK.DESTRUCTIBLE.CREATE:
                new Destructible(context.x, context.y, context.item);                    
            break;   
            case TASK.DESTRUCTIBLE.DESTROY:
                Layers.findById(Layers.destructibles,context.id).destroy();
            break;             
            case TASK.SHOT.DESTROY:
                Layers.findById(Layers.shots, context.id).destroy();
            break;             
            case TASK.DESTRUCTIBLE.DAMAGE:
                Layers.findById(Layers.destructibles, context.id).applyDamage(context.damage);
            break;
            case TASK.NAVY.TYPE:
                var inversedChosenNavy = (context.value + 1) % 2;
                navy.image = game.assets[Navy.prototype.getNavyImageByIndex(inversedChosenNavy)];
                navy.shotImage = game.assets[Shot.prototype.getNavyShotImageByIndex(inversedChosenNavy)];                                            
                navy.updateShotConfig();

                puppetPlayer.image = game.assets[Navy.prototype.getNavyImageByIndex(context.value)];
                puppetPlayer.shotImage = game.assets[Shot.prototype.getNavyShotImageByIndex(context.value)];
                puppetPlayer.updateShotConfig();
            break;
            case TASK.NAVY.SET_FRAME:
                puppetPlayer.setFrame(context.frame);
            break;
        }
	},

	//--> Criar um servidor e aguardar clientes.
    createServer: function () {
        var name = $("#nome").val();
        serverIP = clientIP;
        channel = new Channel(serverIP);
        Panels.chooseServerNavyPanel();
        gameMode = GAME_MODE.MULTI_PLAYER_SERVER;        
    },

    //--> Conectar ao servidor apontado.
    connectServer: function () {
        var ip = $("#ip").val();
        serverIP = ip;
        channel = new Channel(serverIP);
        gameMode = GAME_MODE.MULTI_PLAYER_CLIENT;        
    }
};