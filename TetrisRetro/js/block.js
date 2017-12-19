
var Block = function(x,y){
	this.x = x;
	this.y = y;
	this.x2 = this.x + BW;
	this.y2 = this.y + BW;
	
	Block.prototype.moveBy = function(dx,dy){
		this.x += dx;
		this.y += dy;
		this.x2 = this.x + BW;
		this.y2 = this.y + BW;
	};
	
	Block.prototype.moveTo = function(dx,dy){
		this.x = dx;
		this.y = dy;
		this.x2 = this.x + BW;
		this.y2 = this.y + BW;
	};
};