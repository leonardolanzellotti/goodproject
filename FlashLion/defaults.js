const VIEWPORT = {
	WIDTH: 680,
	HEIGHT: 800,
	DIAGONAL: Math.sqrt(680 * 680 + 800 * 800)
};

const BACKGROUND_SPEED = 2;

const DEFAULT = {
	SHOT_SPEED: 28,
	SHOT_ENEMY_SPEED: 18,
	SHOT_ENEMY_SPEED_SLOW: 6,
	SHOT_ENEMY_SPEED_MEDIUM: 10,
	SHOT_ENEMY_SPEED_FAST: 18,
	HIGHLIGHT_ENEMY_DURATION: 6
};

const IMAGES = {
	TEST: "images/chara2.png",
	LION_SHOT: "images/lion_shot.png",
	LION: "images/lion.png",
	LION_SPECIAL: "images/lion_shotspec.png",
	FLASH_SHOT: "images/flash_shot.png",
	FLASH: "images/flash.png",
	FLASH_SPECIAL: "images/flash_shotspec.png",
	SPACIAL_DEJECT_01: "images/dejetoespacial_01.png",	
	BACKGROUND_LEVEL_01: "images/background_level_01.png",
	PLANET_01: "images/planeta_01.gif",
	BOSS_01: "images/chara2.png",
	BOSS_01_SHOT_02: "images/boss1_atk3.png",
	TOUCH_MOVE_PAD: "images/apad.png",
	RED: "images/red.png",
	BLUE: "images/blue.png",
	GREEN: "images/green.png",
	NPC_01: "images/npc1.png",
	SHOT_NPC_01: "images/npc1_shot.png",
	NPC_02: "images/npc2.png",
	SHOT_NPC_02: "images/npc2_shot.png",
	NPC_03: "images/npc2.png",
	NPC_04: "images/npc2.png",
	SHOT_NPC_04: "images/npc2_shot.png",
	getAll: function () {
		var arr = [];
		for (var i in this) {
			if (typeof(this[i]) == "string") {
				arr.push(this[i]);
			}
		}
		return arr;
	}
};

const URL = {
};

var TASK_I = 0;
const TASK = {	
	NAVY: {
		CREATE: ++TASK_I,
		MOVE: ++TASK_I,
		SHOT: ++TASK_I,
		JUMP: ++TASK_I,
		DASH: ++TASK_I,
		SHOT_CONFIG: ++TASK_I,
		DESTROY: ++TASK_I,
		TYPE: ++TASK_I,		
		SET_FRAME: ++TASK_I
	},
	SHOT: {
		DESTROY: ++TASK_I
	},
	BACKGROUND: {
		MOVE: ++TASK_I
	},
	CHANNEL: {
		OPENED: ++TASK_I,
		CLOSED: ++TASK_I
	},
	DESTRUCTIBLE: {
		CREATE: ++TASK_I,
		DESTROY: ++TASK_I,
		MOVE: ++TASK_I,
		DAMAGE: ++TASK_I
	},
	STACKED_LAYER: {
		CREATE: ++TASK_I,
		MOVE: ++TASK_I
	}
};



const ANIM_FRAMES = {
	NAVY: {
		LEFT: [0, 1, 2],
		RIGHT: [0, 1, 2],
		UP: [0, 1, 2],
		DOWN: [0, 1, 2],
		IDLE: [0, 1, 2],
		DASH_UP: [0, 1, 2],
		DASH_DOWN: [0, 1, 2],
		DASH_LEFT: [0, 1, 2],
		DASH_RIGHT: [0, 1, 2],
		SHOT: [3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5],
		FLASH_SPECIAL: [0, 1, 1, 2, 2, 2, 2, 2],
		LION_SPECIAL: [0,1,2,3,4,5,6,7,7,7,7,7,7]
	},
	BOSS_01: {
		SHOT_02: [0,1,2,3,4,5,6,7,8,9]
	},
	NPC_01: {
		MOVE: [0,1,2,3]
	},
	NPC_02: {
		MOVE: [0,1,2,3,4,5,6,7,8,9]
	}
};


const ITEM = {
	DESTRUCTIBLE: {
		BOX : {name: "BOX", label: "Box", width: 64, height: 64, image: IMAGES.TEST, armor: 20},
		SPACIAL_DEJECT_01 : {name: "SPACIAL_DEJECT_01", label: "Dejeto espacial 1", class: "Destructible", width: 128, height: 128, image: IMAGES.SPACIAL_DEJECT_01, armor: 5},
	},
	ENEMY: {		
		NPC_01 : {name: "NPC_01", label: "NPC 1", class: "NPC_01", width: 64, height: 64, image: IMAGES.NPC_01, armor: 10, frames: ANIM_FRAMES.NPC_01, damage: 2, rateMaxCounter: 40, shotImage: IMAGES.SHOT_NPC_01, speed: 1},
		NPC_02 : {name: "NPC_02", label: "NPC 2", class: "NPC_02", width: 64, height: 64, image: IMAGES.NPC_02, armor: 16, frames: ANIM_FRAMES.NPC_02, damage: 1, rateMaxCounter: 50, shotImage: IMAGES.SHOT_NPC_02, speed: 2},
		NPC_03 : {name: "NPC_03", label: "NPC 3", class: "NPC_03", width: 64, height: 64, image: IMAGES.NPC_03, armor: 5},
		NPC_04 : {name: "NPC_04", label: "NPC 4", class: "NPC_04", width: 64, height: 64, image: IMAGES.NPC_04, armor: 5},
		BOSS_01 : {name: "BOSS_01", label: "The scorpion", class: "Boss_01", width: 180, height: 120, armor: 300, speed: 3},
	}
}

const GAME_MODE = {
	SINGLE_PLAYER: 1,
	MULTI_PLAYER_SERVER: 2,
	MULTI_PLAYER_CLIENT: 3
};

const FRAME_STATE = {
	IDLE: 0,
	STARTED: 0,
	RUNNING: 1,
	FINISHED: 2
};
