enchant();
var game;
var channel;
var currentLevel = 1;
var background;
var navy;
var clientIP, serverIP;
var counterId = 0;
var chosenNavy = 0;
var gameMode = GAME_MODE.SINGLE_PLAYER;

window.onload = function () {

    game = new Core(VIEWPORT.WIDTH, VIEWPORT.HEIGHT);    

    game.fps = 60;
    game.preload(IMAGES.getAll ());

    game.onload = function () {

        //--> Adicionar os handlers de eventos.
        bindEventKeys = function () {
            game.keybind(65, "kLeft");
            game.keybind(68, "kRight");
            game.keybind(87, "kUp");
            game.keybind(83, "kDown");
            game.keybind(85, "kA");
            game.keybind(73, "kB");
            game.keybind(81, "kC");
            game.keybind(69, "kD");
            game.keybind(13, "kPause");

            //new TouchControl();
        };

        //--> Função para iniciar a pilha de levels.
        startLevels = function () {

            Panels.clearPanel();
            bindEventKeys();
            Layers.render();
            GameStatus.refresh();

            switch (currentLevel) {
                case 1:
                    Levels.loadLevel_01();
                break;
            }
        };

        //--> Função para iniciar o game.
        main = function () {
            reset();
            Util.getLocalIP();
            Panels.mainPanel();
        };

        //--> Função para destruir toda a pilha de cenas.
        reset = function () {
            game.rootScene.on(enchant.Event.ENTER_FRAME, function () {});
            var max = 1000;
            for (var name in Layers) {
                if (typeof(Layers[name]) == "object") {
                    while (Layers[name].childNodes.length != undefined && Layers[name].childNodes.length > 0 && max-- > 0) {
                        Layers[name].removeChild(Layers[name].childNodes[0]);
                        game.rootScene.removeChild(Layers[name].childNodes[0]);
                        Layers[name].childNodes[0] = null;
                        Layers[name].childNodes.splice(0, 1);
                    }
                    Layers[name] = new Group();                 
                }
            }
        };


        //--> Inicio do game!
        main();

        //--> Eventos do teclado.
        window.onkeyup = function (evt) {
            var keyCode = evt.keyCode;
            
            switch (keyCode) { 
                default:
                    if (evt.shiftKey) {
                        console.log(evt, keyCode);                        
                    }
                break;
            }
        };
    };

    $("#enchant-stage").css("left", ($("body").width() - $("#enchant-stage").width()) / 2 + "px");
    game.start();    
};