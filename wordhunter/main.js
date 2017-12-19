enchant();
var game;
var gameStatus = GAME_STATUS.MAIN_SCREEN;
var playerStats = {highScore: 0, time: 0, category: 0};

loadPlayerStats = function () {
    if (localStorage.getItem("wordhunteren_player_stats") == undefined) {
        localStorage.setItem("wordhunteren_player_stats", JSON.stringify(playerStats));
    } else {
        playerStats = JSON.parse(localStorage.getItem("wordhunteren_player_stats"));
    }
};

updatePlayerStats = function () {
    localStorage.setItem("wordhunteren_player_stats", JSON.stringify(playerStats));
};

listCategories = function () {
    $(PUZZLE_CONTENT).each(function (index, element) {console.log(("            " + element.category).slice(-12), "=> ", element.words.length);});
};

window.onload = function () {
    loadPlayerStats();
    game = new Core(480, 640);
    game.fps = 60;
    game.preload(RESOURCE.getPath("IMAGE").concat(RESOURCE.getPath("SOUND")));    

    game.onload = function () {
        GUI.onMain();
    };

    game.start();        
};

