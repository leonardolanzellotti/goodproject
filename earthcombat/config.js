const BACKGROUND_COLOR = "#DDD";
const FONT_FACE = "TrajanPro";

const MESSAGE = {
    WAVE: {
        START: "WAVE INICIANDO!",
        LAST: "WAVE FINAL!",
    },
    PHASE: {
        PAUSE: "[EM PAUSA]",
        GET_READY: "PREPARANDO..",
        GO: "JÁ!",    
        FAIL: "FALHA NA MISSÃO!",
        SUCCESS: "MISSÃO CONCLUÍDA!",
        SCORE: "SCORE: ",
    },
    MAIN: {
        SCORE: "SCORE: ",
    }
};

const KEYS = {
    MOVE_LEFT: 37,
    MOVE_RIGHT: 39,
    ACTION: 13
}

const GAME_STATUS = {
	PLAYING: 0,
	PAUSED: 1,
	MAIN_SCREEN: 2,
	FINISHING: 3
};

const WAVE_STATUS = {
    WAITING_START: 0,
	STARTING: 1,
    WAITING_COMBAT: 2,
	COMBATING: 3,
	FINISHING: 4,
    FINISHED: 5
};

//--> Números em porcentagem da tela!
const NPC_PATH = {
    LEFT_BACK: [
        {x: -20, y: 20, time: 1}, 
        {x: 20, y: 10, time: 80},
        {x: 25, y: 15, time: 30},
        {x: 70, y: 20, time: 110},
        {x: 75, y: 25, time: 30},
        {x: -20, y: 30, time: 100}
    ], 
    RIGHT_BACK: [
        {x: 110, y: 20, time: 1}, 
        {x: 80, y: 10, time: 80},
        {x: 75, y: 15, time: 30},
        {x: 30, y: 20, time: 110},
        {x: 25, y: 25, time: 30},
        {x: 110, y: 30, time: 100}
    ],
    TOP_BACK_RIGHT: [
        {x: 80, y: -20, time: 1}, 
        {x: 75, y: 20, time: 80},
        {x: 68, y: 23, time: 30},
        {x: 72, y: 20, time: 110},
        {x: 74, y: 17, time: 30},
        {x: 110, y: 14, time: 100}
    ],
    LEFT_BACK_RIGHT: [
        {x: -20, y: 20, time: 1}, 
        {x: 15, y: 15, time: 80},
        {x: 35, y: 12, time: 70},
        {x: 52, y: 8, time: 50},
        {x: 75, y: 12, time: 70},
        {x: 84, y: 15, time: 30},
        {x: 110, y: 20, time: 50}
    ],
    RIGHT_BACK_LEFT: [
        {x: 120, y: 20, time: 1}, 
        {x: 85, y: 15, time: 80},
        {x: 65, y: 12, time: 70},
        {x: 48, y: 8, time: 50},
        {x: 25, y: 12, time: 70},
        {x: 16, y: 15, time: 40},
        {x: -20, y: 20, time: 50}
    ],
    MIDDLE_BACK_LEFT: [
        {x: 50, y: -10, time: 1}, 
        {x: 45, y: 15, time: 80},
        {x: 40, y: 20, time: 70},
        {x: 35, y: 22, time: 50},
        {x: 17, y: 19, time: 70},
        {x: -20, y: 19, time: 40},
    ],
    MIDDLE_BACK_RIGHT: [
        {x: 50, y: -10, time: 1}, 
        {x: 55, y: 15, time: 80},
        {x: 60, y: 20, time: 70},
        {x: 65, y: 22, time: 50},
        {x: 83, y: 19, time: 70},
        {x: 110, y: 19, time: 40},
    ],
    LEFT_TOP_BACK_RIGHT: [
        {x: -20, y: 25, time: 1}, 
        {x: 18, y: 23, time: 70},
        {x: 23, y: 15, time: 60},
        {x: 46, y: 13, time: 60},
        {x: 75, y: 15, time: 60},
        {x: 80, y: 23, time: 60},
        {x: 110, y: 25, time: 70},
    ],
    RIGHT_TOP_BACK_LEFT: [
        {x: 110, y: 25, time: 1}, 
        {x: 82, y: 23, time: 70},
        {x: 77, y: 15, time: 60},
        {x: 54, y: 13, time: 60},
        {x: 25, y: 15, time: 60},
        {x: 20, y: 23, time: 60},
        {x: -20, y: 25, time: 70},
    ],
    toArray: function () {
    	var arr = []; 
    	for (var key in this) {
    		if (typeof(this[key]) === "object") {
    			arr.push(this[key]);
    		}
    	} 
    	return arr;
    },
    length: 9
};

//--> Valores em porcentagem da tela.
const BUTTON_MOVEMENT = {
    WIDTH: 0.47,
    HEIGHT: 0.14,
    LEFT: 0.02,
    TOP: 0.85
};

//--> Valores em porcentagem da tela.
const NAVY_LIFE = {
    POSITION: {
        WIDTH: 0.30,
        HEIGHT: 0.02,
        LEFT: 0.02,
        TOP: 0.81
    },
    BGCOLOR: "#C0392B",
    FGCOLOR: "#F1C40F"
};

const NPC_LIFE = {
    BGCOLOR: "#C0392B",
    FGCOLOR: "#52BE80"
};

//--> Valores em porcentagem da tela.
const STARS = {
    POSITION: {
        LEFT: 0.025,
        TOP: 0.77
    }
};

const NPCS = {
    PURPLE1: {ID: "PURPLE1", LIFE: 8, RATE: 20, DAMAGE: 1, SHOT_SPEED: 12, IMAGE: "npc1", SCORE: 10},
    GREEN1: {ID: "GREEN1", LIFE: 12, RATE: 25, DAMAGE: 1, SHOT_SPEED: 10, IMAGE: "npc2", SCORE: 12},
    RED1: {ID: "RED1", LIFE: 10, RATE: 30, DAMAGE: 3, SHOT_SPEED: 8, IMAGE: "npc3", SCORE: 15},
    PURPLE2: {ID: "PURPLE2", LIFE: 14, RATE: 20, DAMAGE: 2, SHOT_SPEED: 12, IMAGE: "npc4", SCORE: 18},
    GREEN2: {ID: "GREEN2", LIFE: 18, RATE: 25, DAMAGE: 2, SHOT_SPEED: 10, IMAGE: "npc5", SCORE: 20},
    RED2: {ID: "RED2", LIFE: 14, RATE: 30, DAMAGE: 5, SHOT_SPEED: 8, IMAGE: "npc6", SCORE: 30},
};

const ITEMS = {
    NAVY_INCREASE_LIFE: {IMAGE: "items", ACTION: "increaseLifeNavy", VALUE: 8, SCORE: 10, FRAME: 0, SPEED: 30},
    NAVY_INCREASE_DAMAGE: {IMAGE: "items", ACTION: "increaseDamageNavy", VALUE: 1, SCORE: 10, FRAME: 1, SPEED: 30},
    NAVY_DECREASE_RATE: {IMAGE: "items", ACTION: "decreaseRateNavy", VALUE: 1, SCORE: 10, FRAME: 2, SPEED: 30},
    get: function (index) {
        var j = 0;
        for (var i in this) {
            if (typeof(this[i]) == "object") {
                if (j == index) {
                    return this[i];
                }
            }         
            j++;       
        }
    },
    length: 3
};

const PHASES = [    
    [//--> Fase 1
        {NPCS: [NPCS.PURPLE1, NPCS.PURPLE1], DROP_ITEM: 0.25}, 
        {NPCS: [NPCS.PURPLE1, NPCS.PURPLE1, NPCS.PURPLE1], DROP_ITEM: 0.25}, 
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1], DROP_ITEM: 0.25},
    ],
    [//--> Fase 2
        {NPCS: [NPCS.PURPLE1, NPCS.PURPLE1, NPCS.PURPLE1], DROP_ITEM: 0.20}, 
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1], DROP_ITEM: 0.25},
        {NPCS: [NPCS.PURPLE1, NPCS.PURPLE1, NPCS.GREEN1], DROP_ITEM: 0.25},        
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1, NPCS.GREEN1], DROP_ITEM: 0.20},
    ],
    [//--> Fase 3
        {NPCS: [NPCS.PURPLE1, NPCS.PURPLE1, NPCS.PURPLE1, NPCS.GREEN1], DROP_ITEM: 0.25}, 
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1, NPCS.GREEN1], DROP_ITEM: 0.25},
        {NPCS: [NPCS.PURPLE1, NPCS.PURPLE1, NPCS.GREEN1, NPCS.GREEN1], DROP_ITEM: 0.25},
        {NPCS: [NPCS.PURPLE1, NPCS.RED1, NPCS.GREEN1], DROP_ITEM: 0.20},
    ],
    [//--> Fase 4
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1, NPCS.GREEN1], DROP_ITEM: 0.20}, 
        {NPCS: [NPCS.PURPLE1, NPCS.PURPLE1, NPCS.GREEN1, NPCS.GREEN1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.PURPLE1, NPCS.PURPLE1, NPCS.GREEN1, NPCS.RED1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1], DROP_ITEM: 0.20},
    ],
    [//--> Fase 5
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1], DROP_ITEM: 0.20}, 
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.PURPLE1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1, NPCS.RED1], DROP_ITEM: 0.20},
    ],
    [//--> Fase 6
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1, NPCS.PURPLE2], DROP_ITEM: 0.20}, 
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.PURPLE2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.PURPLE2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.RED1, NPCS.RED1, NPCS.PURPLE2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.PURPLE2, NPCS.PURPLE2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.RED1, NPCS.PURPLE2, NPCS.PURPLE2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED1, NPCS.RED1, NPCS.RED1, NPCS.RED1, NPCS.RED1, NPCS.RED1], DROP_ITEM: 0.20},
    ],
    [//--> Fase 7
        {NPCS: [NPCS.GREEN1, NPCS.RED1, NPCS.RED1, NPCS.PURPLE2, NPCS.PURPLE2], DROP_ITEM: 0.15}, 
        {NPCS: [NPCS.RED1, NPCS.GREEN1, NPCS.GREEN1, NPCS.PURPLE2, NPCS.GREEN2], DROP_ITEM: 0.15},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN2, NPCS.GREEN2], DROP_ITEM: 0.15},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.PURPLE2, NPCS.PURPLE2,NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.PURPLE2, NPCS.GREEN2, NPCS.GREEN2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN2, NPCS.RED1, NPCS.RED1, NPCS.PURPLE2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.PURPLE2, NPCS.GREEN2, NPCS.GREEN2], DROP_ITEM: 0.20},
    ],
    [//--> Fase 8
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN2], DROP_ITEM: 0.15}, 
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1, NPCS.PURPLE2], DROP_ITEM: 0.15},
        {NPCS: [NPCS.PURPLE2, NPCS.RED1, NPCS.GREEN1, NPCS.RED1, NPCS.GREEN1, NPCS.RED1], DROP_ITEM: 0.15},
        {NPCS: [NPCS.GREEN1, NPCS.RED1, NPCS.GREEN1, NPCS.RED1, NPCS.GREEN1, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1, NPCS.RED1, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.PURPLE2, NPCS.RED1, NPCS.RED1, NPCS.GREEN1, NPCS.RED2, NPCS.GREEN1], DROP_ITEM: 0.30},
        {NPCS: [NPCS.GREEN1, NPCS.PURPLE2, NPCS.GREEN1, NPCS.RED2, NPCS.GREEN1, NPCS.RED2], DROP_ITEM: 0.20},
    ],
    [//--> Fase 9
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN2], DROP_ITEM: 0.20}, 
        {NPCS: [NPCS.GREEN2, NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.RED2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1, NPCS.RED1, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN2, NPCS.RED1, NPCS.GREEN1, NPCS.RED2, NPCS.GREEN1, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED1, NPCS.PURPLE2, NPCS.RED1, NPCS.RED1, NPCS.GREEN1, NPCS.RED2, NPCS.GREEN1], DROP_ITEM: 0.30},
        {NPCS: [NPCS.RED2, NPCS.PURPLE2, NPCS.RED1, NPCS.GREEN1, NPCS.RED1, NPCS.GREEN1, NPCS.RED1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN2, NPCS.PURPLE1, NPCS.PURPLE2, NPCS.RED2, NPCS.PURPLE2, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN2, NPCS.PURPLE2, NPCS.GREEN1, NPCS.RED2, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
    ],
    [//--> Fase 10
        {NPCS: [NPCS.RED1, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN2, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1], DROP_ITEM: 0.15}, 
        {NPCS: [NPCS.PURPLE2, NPCS.GREEN2, NPCS.GREEN2, NPCS.RED2, NPCS.GREEN1, NPCS.RED1], DROP_ITEM: 0.15},
        {NPCS: [NPCS.PURPLE2, NPCS.RED2, NPCS.GREEN1, NPCS.RED1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1], DROP_ITEM: 0.15},
        {NPCS: [NPCS.RED1, NPCS.RED1, NPCS.RED2, NPCS.RED1, NPCS.GREEN1, NPCS.GREEN2, NPCS.GREEN1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.RED2, NPCS.GREEN2, NPCS.RED1, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED2, NPCS.GREEN1, NPCS.PURPLE2, NPCS.RED1, NPCS.RED1, NPCS.RED1, NPCS.GREEN2], DROP_ITEM: 0.30},
        {NPCS: [NPCS.RED2, NPCS.PURPLE2, NPCS.GREEN2, NPCS.PURPLE2, NPCS.RED2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED2, NPCS.PURPLE2, NPCS.GREEN2, NPCS.GREEN2, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
    ],
    [//--> Fase 11
        {NPCS: [NPCS.RED1, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN2, NPCS.GREEN1, NPCS.GREEN1, NPCS.GREEN1], DROP_ITEM: 0.15}, 
        {NPCS: [NPCS.PURPLE2, NPCS.GREEN2, NPCS.GREEN2, NPCS.RED2, NPCS.GREEN1, NPCS.RED1], DROP_ITEM: 0.15},
        {NPCS: [NPCS.PURPLE2, NPCS.RED2, NPCS.GREEN1, NPCS.RED1, NPCS.GREEN1, NPCS.RED1, NPCS.RED1], DROP_ITEM: 0.15},
        {NPCS: [NPCS.RED1, NPCS.RED1, NPCS.RED2, NPCS.RED1, NPCS.GREEN1, NPCS.GREEN2, NPCS.GREEN1], DROP_ITEM: 0.20},
        {NPCS: [NPCS.GREEN1, NPCS.RED2, NPCS.GREEN2, NPCS.RED1, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED2, NPCS.GREEN1, NPCS.PURPLE2, NPCS.RED1, NPCS.RED1, NPCS.RED1, NPCS.GREEN2], DROP_ITEM: 0.30},
        {NPCS: [NPCS.RED2, NPCS.PURPLE2, NPCS.GREEN2, NPCS.PURPLE2, NPCS.RED2, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED2, NPCS.PURPLE2, NPCS.GREEN2, NPCS.GREEN2, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED2, NPCS.PURPLE2, NPCS.GREEN2, NPCS.GREEN2, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
    ],
    [//--> Fase 12
        {NPCS: [NPCS.PURPLE2, NPCS.GREEN1, NPCS.GREEN2, NPCS.RED1, NPCS.GREEN2, NPCS.RED1, NPCS.PURPLE1], DROP_ITEM: 0.30},
        {NPCS: [NPCS.RED1, NPCS.GREEN2, NPCS.GREEN1, NPCS.GREEN2, NPCS.GREEN1, NPCS.GREEN2, NPCS.PURPLE1], DROP_ITEM: 0.30}, 
        {NPCS: [NPCS.PURPLE2, NPCS.RED2, NPCS.GREEN1, NPCS.RED1, NPCS.GREEN2, NPCS.RED1, NPCS.RED1], DROP_ITEM: 0.30},
        {NPCS: [NPCS.RED2, NPCS.RED1, NPCS.RED2, NPCS.RED1, NPCS.GREEN1, NPCS.GREEN2, NPCS.GREEN1], DROP_ITEM: 0.30},
        {NPCS: [NPCS.GREEN2, NPCS.RED2, NPCS.GREEN2, NPCS.RED1, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED2, NPCS.GREEN1, NPCS.PURPLE2, NPCS.RED2, NPCS.RED1, NPCS.RED1, NPCS.GREEN2], DROP_ITEM: 0.30},
        {NPCS: [NPCS.GREEN1, NPCS.RED1, NPCS.GREEN2, NPCS.RED1, NPCS.GREEN2, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.RED2, NPCS.PURPLE1, NPCS.GREEN2, NPCS.PURPLE2, NPCS.RED2, NPCS.PURPLE1, NPCS.PURPLE2], DROP_ITEM: 0.20},
        {NPCS: [NPCS.PURPLE1, NPCS.RED2, NPCS.PURPLE1, NPCS.GREEN2, NPCS.GREEN2, NPCS.GREEN2, NPCS.RED2], DROP_ITEM: 0.20},
    ],
];

//--> Mapa dos pontos por onde a Nave terá que passar (Fases do jogo). Valores em porcentagem.
const PHASES_MAP = [
    {x: 0.05, y: 0.53},
    {x: 0.08, y: 0.63},
    {x: 0.07, y: 0.73},
    {x: 0.12, y: 0.85},
    {x: 0.29, y: 0.88},
    {x: 0.50, y: 0.90},
    {x: 0.68, y: 0.86},
    {x: 0.82, y: 0.88},
    {x: 0.80, y: 0.75},
    {x: 0.83, y: 0.61},
    {x: 0.86, y: 0.51},
    {x: 0.78, y: 0.42},
    {x: 0.82, y: 0.32},
    {x: 0.80, y: 0.19},
    {x: 0.70, y: 0.05},
];

const NAVY_LIMIT = {
    LIFE: 30,
    RATE: 6,
    DAMAGE: 6,
    ONE_CANNONS_OFFSET: 0,
    TWO_CANNONS_OFFSET: 17,
};

const NAVY_UPGRADE = [
    {PHASE: 6, LIFE: 40, CANNON: 1, DAMAGE: 2},
    {PHASE: 11, LIFE: 50, CANNON: 2, DAMAGE: 1},
    {PHASE: 16, LIFE: 65, CANNON: 3, DAMAGE: 2},
];

const DEBUG = false;

const BACKGROUND_SPEED = 6;

const MAP_PIN = {
    OFFSET_X: -16,
    OFFSET_Y: -42,
};

const NAVY_LIFE_FINISHED_WAVE = 3;

//----> Cores	              http://htmlcolorcodes.com/color-chart/flat-design-color-chart/
//----> Sons	              https://freesound.org/people/Kastenfrosch/packs/10069/
//----> Fundo playing         https://www.youtube.com/watch?v=QdIYVXCfrQM (loop em 3:30)
//----> Fundo main            https://www.youtube.com/watch?v=jdqcB_lKS1A
//----> Fontes                https://www.makeschool.com/gamernews/318/40-awesome-free-fonts-for-your-game