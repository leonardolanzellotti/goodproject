var Signal = function (x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.blocks = [1,1,1,1,0,1];
	this.blockWidth = BW * 0.75;
	this.counter = 0;
	this.width = 1;
	this.height = 6;
};