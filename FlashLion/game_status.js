
//--> Classe estática para atualizar as informações úteis na tela dos jogadores.
var GameStatus = {

    //--> Criar um label na tela para exibir os status do jogo.
    addLabel: function (index, prefix) {
        var lbl = new Label("");
        lbl.prefix = prefix;
        lbl.width = 230;
        lbl.height = 40;
        lbl.x = game.width - lbl.width;
        lbl.y = lbl.height * index;
        lbl.font = "26px Arial";
        lbl.backgroundColor = "rgba(0,0,0,0.75)";
        lbl.color = "white";
        lbl.textAlign = "center";
        Layers.status.addChild(lbl);
        return lbl;
    },

    //--> Atualizar os status do game.
    refresh: function () {

        var INDEX_I = -1;
        Layers.status.INDEX_FPS = ++INDEX_I;
        Layers.status.INDEX_DEBUG = ++INDEX_I;
        Layers.status.INDEX_BG_PERCENT = ++INDEX_I;
        Layers.status.INDEX_NAVY_HP = ++INDEX_I;
        GameStatus.addLabel(Layers.status.INDEX_FPS, "FPS: {0}");
        GameStatus.addLabel(Layers.status.INDEX_DEBUG, "TXT: {0}");
        GameStatus.addLabel(Layers.status.INDEX_BG_PERCENT, "BG: {0}");
        GameStatus.addLabel(Layers.status.INDEX_NAVY_HP, "HP: {0}");

        if (gameMode != GAME_MODE.SINGLE_PLAYER) {
            Layers.status.INDEX_MENSSAGE_SENT = ++INDEX_I;
            Layers.status.INDEX_MESSAGE_RECEIVED = ++INDEX_I;
            Layers.status.INDEX_CLIENT_IP = ++INDEX_I;
            Layers.status.INDEX_SERVER_IP = ++INDEX_I;
            GameStatus.addLabel(Layers.status.INDEX_MENSSAGE_SENT, "SNT: {0}");
            GameStatus.addLabel(Layers.status.INDEX_MESSAGE_RECEIVED, "RCV: {0}");
            GameStatus.addLabel(Layers.status.INDEX_CLIENT_IP, "CIP: {0}");
            GameStatus.addLabel(Layers.status.INDEX_SERVER_IP, "SIP: {0}");
            Layers.status.childNodes[Layers.status.INDEX_CLIENT_IP].text = Layers.status.childNodes[Layers.status.INDEX_CLIENT_IP].prefix.replace("{0}", clientIP);
            Layers.status.childNodes[Layers.status.INDEX_SERVER_IP].text = Layers.status.childNodes[Layers.status.INDEX_SERVER_IP].prefix.replace("{0}", serverIP);                
        }            

        //--> Loop para ficar atualizando os parâmetros dinâmicos.
        game.rootScene.on(enchant.Event.ENTER_FRAME, function () {
            if (Layers.status.childNodes.length == 0) {
                return false;
            }

            var updateDelay = 30;
            background.percent = parseFloat(101 - 100 * -background.y / (background.height - VIEWPORT.HEIGHT)).toFixed(2);

            if (this.age % updateDelay == 0) {
                Layers.status.childNodes[Layers.status.INDEX_FPS].text = Layers.status.childNodes[Layers.status.INDEX_FPS].prefix.replace("{0}", parseInt(game.actualFps));
                Layers.status.childNodes[Layers.status.INDEX_BG_PERCENT].text = Layers.status.childNodes[Layers.status.INDEX_BG_PERCENT].prefix.replace("{0}", parseInt(background.percent) + "%");
                Layers.status.childNodes[Layers.status.INDEX_NAVY_HP].text = Layers.status.childNodes[Layers.status.INDEX_NAVY_HP].prefix.replace("{0}", Layers.navys.childNodes[0].armor);

                if (gameMode != GAME_MODE.SINGLE_PLAYER) {
                    Layers.status.childNodes[Layers.status.INDEX_MENSSAGE_SENT].text = Layers.status.childNodes[Layers.status.INDEX_MENSSAGE_SENT].prefix.replace("{0}", channel.nMessagesSent);
                    Layers.status.childNodes[Layers.status.INDEX_MESSAGE_RECEIVED].text = Layers.status.childNodes[Layers.status.INDEX_MESSAGE_RECEIVED].prefix.replace("{0}", channel.nMessagesReceived);                        
                }
            }
        });

        //--> Informar modo de jogo.
        if (gameMode == GAME_MODE.MULTI_PLAYER_CLIENT) {
            this.debug("Client");
        } else if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
            this.debug("Server");
        } else {
            this.debug("Campaign");
        }
    },

    //--> Exibe mensagem de debug.
    debug: function (text) {
        Layers.status.childNodes[Layers.status.INDEX_DEBUG].text = text;
    }

};