const PIECE_TYPE = {
	"L":0,
	"S":1,
	"I":2,
	"T":3,
	"Q":4,
	"Z":5,
	"length":6,
	random: function(){
		return ["L","S","I","T","Q","Z"][Math.floor(Math.random()*this.length)];
	}
};

const PIECE_BLOCK = {
	"L": [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}],
	"S": [{x: 0, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 0}],
	"I":  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
	"T": [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}],
	"Q": [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
	"Z": [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
};

const PIECE_ROTATION = {
	"L": [
		[{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}],
		[{x: 0, y: 1}, {x: 0, y: 2}, {x: -1, y: 0}],
		[{x: -1, y: 0}, {x: -2, y: 0}, {x: 0, y: -1}],
		[{x: 0, y: -1}, {x: 0, y: -2}, {x: 1, y: 0}]
	],
	"S": [
		[{x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 0}],
		[{x: 0, y: -1}, {x: 1, y: 1}, {x: 1, y: 0}]
	],
	"I": [
		[{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
		[{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: -1}]
	],
	"T": [
		[{x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}],
		[{x: 0, y: -1}, {x: -1, y: 0}, {x: 0, y: 1}],
		[{x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}],
		[{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}]
	],
	"Z": [
		[{x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
		[{x: 0, y: -1}, {x: -1, y: 1}, {x: -1, y: 0}]
	],
	"Q": []
};
	
var Piece = function(x,y,color,type){
	this.x = x;
	this.y = y;
	this.color = color || "#fff";
	this.type = type;
	this.isFixed = false;
	this.rotation = 0;
	this.blocks = [];
	
	Piece.prototype.moveDown = function(){
		this.y += BW;
		
		for(var i in this.blocks){
			this.blocks[i].moveBy(0,BW);
		}
	};
	
	Piece.prototype.moveX = function(dx){
		this.x += dx * BW;
		
		for(var i in this.blocks){
			this.blocks[i].moveBy(dx*BW,0);
		}
	};
	
	Piece.prototype.rotate = function(){
		this.rotation = (this.rotation + 1 == PIECE_ROTATION[this.type].length) ? 0 : this.rotation + 1;
		var rotations = PIECE_ROTATION[this.type][this.rotation];
		if(rotations != undefined){
			var pivot = this.blocks[0];
			for(var i=0;i<rotations.length;i++){
				this.blocks[i+1].moveTo(pivot.x + rotations[i].x * BW, pivot.y + rotations[i].y * BW);
			}
		}
	};
	
	Piece.prototype.createBlocks = function(){
		var blocks = PIECE_BLOCK[this.type];
		for(var i in blocks){
			this.blocks.push(new Block(this.x + blocks[i].x * BW, this.y + blocks[i].y * BW));
		}
	};
	
	Piece.prototype.getBounds = function(){
		var bounds = {"x": W, "y": H, "x2": 0, "y2": 0};
		for(var i in this.blocks){
			bounds.x = Math.min(bounds.x, this.blocks[i].x);
			bounds.y = Math.min(bounds.y, this.blocks[i].y);
			bounds.x2 = Math.max(bounds.x2, this.blocks[i].x2);
			bounds.y2 = Math.max(bounds.y2, this.blocks[i].y2);
		}
		return bounds;
	};
	
	this.createBlocks();
};
