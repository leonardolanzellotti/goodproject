//--> Classe estática para definir os painéis que aparecem no jogo.
var Panels = {

    //--> Função para limpar o painel ativo.
    clearPanel: function () {
        $("body #panel").remove();
    },
    
    //--> Painel de inicialização do game.
    mainPanel: function () {
        var panel = $("<div id='panel'><div class='back'></div><div class='front'></div></div>");
        var front = panel.find(".front");
        front.append("<ul></ul>");   
        front.find("ul").append("<li><button class='default' onclick='Panels.createServerPanel()'>Criar servidor</button></li>");        
        front.find("ul").append("<li><button class='default' onclick='Panels.connectServerPanel()'>Conectar servidor</button></li>");
        front.find("ul").append("<li><button class='default' onclick='gameMode=GAME_MODE.SINGLE_PLAYER;Panels.chooseServerNavyPanel()'>Campanha</button></li>");
        Panels.clearPanel();
        panel.appendTo($("body"));
        gameMode = GAME_MODE.SINGLE_PLAYER;
    },

    //--> Painel de inicialização da rede como servidor.
    createServerPanel: function () {
        var panel = $("<div id='panel'><div class='back'></div><div class='front'></div></div>");
        var front = panel.find(".front");
        front.append("<ul></ul>");   
        front.find("ul").append("<li><label>Nome do servidor:</label><input type='text' placeholder='teste' id='nome'/></li>");        
        front.find("ul").append("<li><label>Seu IP:</label><input type='text' placeholder='teste' value='"+ clientIP +"' disabled='true' /></li>");
        front.find("ul").append("<li><button class='voltar' onclick='Panels.mainPanel()'>Voltar</button></li>");
        front.find("ul").append("<li><button class='criar-servidor' onclick='MultiplayerContext.createServer()'>Concluir!</button></li>");
        Panels.clearPanel();
        panel.appendTo($("body"));
    },

    //--> Painel de conexão na rede como cliente.
    connectServerPanel: function () {
        var panel = $("<div id='panel'><div class='back'></div><div class='front'></div></div>");
        var front = panel.find(".front");
        front.append("<ul></ul>");   
        front.find("ul").append("<li><label>IP do servidor:</label><input type='text' value='"+ clientIP +"' placeholder='teste' id='ip'/></li>");        
        front.find("ul").append("<li><label>Seu nome:</label><input type='text' placeholder='teste2' id='nome'/></li>");        
        front.find("ul").append("<li><label>Seu IP:</label><input type='text' placeholder='teste' value='"+ clientIP +"' disabled='true' /></li>");
        front.find("ul").append("<li><button class='voltar' onclick='Panels.mainPanel()'>Voltar</button></li>");
        front.find("ul").append("<li><button class='conectar-servidor' onclick='MultiplayerContext.connectServer()'>Conectar!</button></li>");
        Panels.clearPanel();
        panel.appendTo($("body"));
    },

    //--> Painel de escolha da nave do server, ou player 1.
    chooseServerNavyPanel: function () {
        var panel = $("<div id='panel'><div class='back'></div><div class='front'></div></div>");
        var front = panel.find(".front");
        front.append("<ul></ul>");
        front.find("ul").append("<li><label>Sua nave:</label></li>");
        front.find("ul").append("<li><table cellpadding='10' cellspacing='10' class='navys' align='center'><tr></tr></table></li>");
        front.find("ul table.navys tr").append("<td><img src='images/lion-entrance.gif' style='float: left;' onclick='chosenNavy=0;Panels.afterChosenNavy()' /></td>");
        front.find("ul table.navys tr").append("<td><img src='images/flash-entrance.gif' style='float: right;' onclick='chosenNavy=1;Panels.afterChosenNavy()' /></td>");
        Panels.clearPanel();
        panel.appendTo($("body"));
    },

    //--> Função para iniciar a campanha (single player) ou aguardar outros jogadores (multi player).
    afterChosenNavy: function () {
        if (gameMode == GAME_MODE.SINGLE_PLAYER) {            
            startLevels ();
        } else if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
            Panels.waitingForClientPanel ();
        }
    },

    //--> Painel para aguardar conexão do player 2.
    waitingForClientPanel: function () {
        var panel = $("<div id='panel'><div class='back'></div><div class='front'></div></div>");
        var front = panel.find(".front");
        front.append("<ul></ul>");   
        front.find("ul").append("<li><label style='display: block; text-align: center; width: 100%;'>Aguardando player 2</label></li>");
        front.find("ul").append("<li><button class='voltar' onclick='Panels.mainPanel()'>Cancelar</button></li>");
        Panels.clearPanel();
        panel.appendTo($("body"));
    }
};