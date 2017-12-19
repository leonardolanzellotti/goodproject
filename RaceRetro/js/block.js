
var Block = function(x,y,color, width, height){
	this.x = x;
	this.y = y;
	this.width = width || BW;
	this.height = height || BW;
	this.color = color;
	
	Block.prototype.moveBy = function(dx,dy){
		this.x += dx;
		this.y += dy;
	};
	
	Block.prototype.moveTo = function(dx,dy){
		this.x = dx;
		this.y = dy;
	};
	
	Block.prototype.pointInRect = function (pointX, pointY) {
		return (pointX >= this.x && pointX <= this.x + this.width && pointY >= this.y && pointY <= this.y + this.height);
	};

	Block.prototype.rectInRect = function (other) {
		return (
			this.pointInRect(other.x, other.y) ||
			this.pointInRect(other.x + other.width, other.y) ||
			this.pointInRect(other.x, other.y + other.height) ||
			this.pointInRect(other.x + other.width, other.y + other.height)
		);
	};
		 
};