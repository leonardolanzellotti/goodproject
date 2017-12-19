enchant();
var game;
var gameStatus = GAME_STATUS.MAIN_SCREEN;
var playerStats = {"phase": 1, "score" : 0, "enemiesDefeated" : 0};

loadPlayerStats = function () {
    if (localStorage.getItem("earthcombat_player_stats") == undefined) {
        localStorage.setItem("earthcombat_player_stats", JSON.stringify(playerStats));
    } else {
        playerStats = JSON.parse(localStorage.getItem("earthcombat_player_stats"));
    }
};

updatePlayerStats = function () {
    localStorage.setItem("earthcombat_player_stats", JSON.stringify(playerStats));
};

addBindInputs = function () {
    game.keybind(KEYS.MOVE_LEFT, "moveLeft");
    game.keybind(KEYS.MOVE_RIGHT, "moveRight");
    game.keybind(KEYS.ACTION, "action");
};

importFonts = function () {
    $("body").append("<style>@font-face {font-family: TrajanPro; src: url(resource/font/TrajanPro-Regular.otf)}</style>");
};

deltaSeconds = function (seconds) {
    return seconds * game.actualFps / 60;
};

summarizeGame = function () {

    var limits = {minLife: 1000, maxLife: 0, minRate: 1000, maxRate: 0, minDamage: 1000, maxDamage: 0, minShotSpeed: 1000, maxShotSpeed: 0};
    var npcDificulties = {};
    var precision = 3;

    fillNpcLimits = function () {
        for (var i in NPCS) {
            limits.maxLife = Math.max(limits.maxLife, NPCS[i].LIFE);
            limits.minLife = Math.min(limits.minLife, NPCS[i].LIFE);
            limits.maxRate = Math.max(limits.maxRate, NPCS[i].RATE);
            limits.minRate = Math.min(limits.minRate, NPCS[i].RATE);
            limits.maxDamage = Math.max(limits.maxDamage, NPCS[i].DAMAGE);
            limits.minDamage = Math.min(limits.minDamage, NPCS[i].DAMAGE);
            limits.maxShotSpeed = Math.max(limits.maxShotSpeed, NPCS[i].SHOT_SPEED);
            limits.minShotSpeed = Math.min(limits.minShotSpeed, NPCS[i].SHOT_SPEED);
        }
        //--> Criando margem para os limites.
        limits.maxLife += 3;
        limits.minLife -= 2.5;
        limits.maxRate += 2;
        limits.minRate -= 1.5;
        limits.maxDamage += 0.5;
        limits.minDamage -= 0.5;
        limits.maxShotSpeed += 1;
        limits.minShotSpeed -= 1;
    };

    fillNpcDificulties = function () {
        for (var i in NPCS) {
            npcDificulties[i] = getNpcDificulty(NPCS[i]);
        }
    };

    getNpcDificulty = function (npc) {
        var lifeWeight = 0.35;
        var rateWeight = 0.10;
        var damageWeight = 0.30;
        var shotSpeedWeight = 0.25;
        var lifeFactor = (npc.LIFE - limits.minLife) / (limits.maxLife - limits.minLife);
        var rateFactor = (npc.RATE - limits.minRate) / (limits.maxRate - limits.minRate);
        var damageFactor = (npc.DAMAGE - limits.minDamage) / (limits.maxDamage - limits.minDamage);
        var shotSpeedFactor = (npc.SHOT_SPEED - limits.minShotSpeed) / (limits.maxShotSpeed - limits.minShotSpeed);

        return parseFloat((lifeFactor * lifeWeight + rateFactor * rateWeight + damageFactor * damageWeight + shotSpeedFactor * shotSpeedWeight).toFixed(precision));
    };

    listEnemies = function () {
        console.log("--> DIFICULDADE DOS INIMIGOS");
        for (var i in npcDificulties) {
            console.log((i + ".......................").substring(0, 20), npcDificulties[i].toFixed(precision));
        }        
        console.log("");
    };

    listPhases = function () {
        //--> Phase 1, Wave 1.. Wave 2... Wave N
        console.log("--> DIFICULDADE DAS FASES");

        for (var i in PHASES) {
            console.log("FASE.......................".substring(0, 20), (parseInt(i) + 1));
            var amountNpcsPhase = 0;
            var dificultyPhase = 0;
            var dropHelpPhase = 0;
            var dificultyNpcPhase = 0;
            var wavesPhase = 0;

            for (var j in PHASES[i]) {
                var amountNpcs = PHASES[i][j].NPCS.length;
                var dificultyNpc = 0;
                var dropHelp = PHASES[i][j].DROP_ITEM / amountNpcs;
                var dificulty = 0;

                for (var k in PHASES[i][j].NPCS) {
                    dificultyNpc += npcDificulties[PHASES[i][j].NPCS[k].ID];
                }

                dificulty = dificultyNpc - dropHelp;

                console.log("....WAVE: " + (parseInt(j) + 1), "| QTD: " + amountNpcs, "| DROP: " + dropHelp.toFixed(precision), "| NPCS: " + dificultyNpc.toFixed(precision), "| DIFICULDADE: " + dificulty.toFixed(precision));
                amountNpcsPhase += amountNpcs;
                dificultyPhase += dificulty;
                dropHelpPhase += dropHelp;
                dificultyNpcPhase += dificultyNpc;
                wavesPhase += 1;
            }
            console.log("............. QTD: " + amountNpcsPhase, "| DROP: " + dropHelpPhase.toFixed(precision), "| NPCS: " + dificultyNpcPhase.toFixed(precision), "| DIFICULDADE: " + (dificultyPhase / wavesPhase).toFixed(precision));

            console.log("");
        }
        console.log("");
    };

    fillNpcLimits();
    fillNpcDificulties();
    listEnemies();
    listPhases();
}; 

window.onload = function () {
    loadPlayerStats();
    importFonts();
    game = new Core(480, 640);
    game.fps = 60;
    game.preload(RESOURCE.getPath("IMAGE").concat(RESOURCE.getPath("SOUND")));    

    game.onload = function () {
        addBindInputs();        
        GUI.onMain();
        summarizeGame();
    };

    game.start();    
};