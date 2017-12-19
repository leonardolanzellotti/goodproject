const COLOR = {
	"RED":"#f00","GREEN":"#0f0","BLUE":"#00f",
	"YELLOW":"#ff0","PURPLE":"#f0f","CYAN":"#0ff",
	"BLACK":"#000", "WHITE":"#fff","GREY":"#aaa",
	random:function(){
		return [COLOR.RED, COLOR.GREEN, COLOR.BLUE, COLOR.YELLOW, COLOR.PURPLE, COLOR.CYAN][Math.floor(Math.random() * 6)];
	},getColor:function(index){
		return [0,0,COLOR.RED,COLOR.GREEN, COLOR.BLUE, COLOR.YELLOW, COLOR.PURPLE, COLOR.CYAN, COLOR.BLACK, COLOR.WHITE, COLOR.GREY][index];
	}
};

const CAR_CONFIG = {
	CAR: {
		ID: 1,
		POS: [
				[0,7,1,7,0], [8,1,1,1,8], [0,1,1,1,0], [0,1,1,1,0], [8,1,1,1,8]
		],
		W:5,
		H:5,
		SPEED: 2,
		PROB: 0.55
	},
	MOTO: {
		ID: 2,
		POS: [
			[1,1], [8,8], [1,1], [8,8], [1,1]
		],
		W:2,
		H:5,
		SPEED: 3,
		PROB: 0.30
	},
	BUS: {
		ID: 3,
		POS: [
			[7,1,1,1,7], [1,1,1,1,1], [8,1,1,1,8], [8,1,1,1,8], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1] , [1,1,1,1,1] , [8,1,1,1,8], [8,1,1,1,8] , [1,1,1,1,1]
		],
		W:5,
		H:11,
		SPEED: 1,
		PROB: 0.10
	},
	AMBULANCE: {
		ID: 4,
		POS: [
			[0,5,9,5,0], [9,9,9,9,9], [8,9,9,9,8], [9,9,2,9,9], [9,2,2,2,9], [9,9,2,9,9], [8,9,9,9,8]
		],
		W:5,
		H:7,
		SPEED: -2.5,
		PROB: 0.05
	},
	random: function(){
		var q = [CAR_CONFIG.CAR, CAR_CONFIG.MOTO, CAR_CONFIG.BUS, CAR_CONFIG.AMBULANCE];
		var p = Math.random();
		var pi = 0;
		
		for (var i = 0; i < q.length; i++) {
			if (p >= pi && p < pi + q[i].PROB) {
				return q[i];
			}
			pi += q[i].PROB;
		}
		return q[0];
	}
};	

const W = 240, H = 300, FPS = 20, BW = 10;
const PLAYER_SPEED = 13;
const ADD_CAR_DELAY_DECREASE = 15, ADD_CAR_DELAY_LIMIT = 25, RACE_SPEED_INCREASE = 0.14, DIFFICULTY_PERIOD = 5;
const ADD_JUMP_PERIOD = 7;
const KEYS = {
	LEFT: 65,//37
	UP: 87,//38
	RIGHT: 68,//39
	DOWN: 83,//40
	JUMP: 32
};