var Rect = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

var RectCell = function (row, col, rowSize, colSize) {
    this.row = row;
    this.col = col;
    this.rowSize = rowSize;
    this.colSize = colSize;
    this.x = this.col * this.colSize;
    this.y = this.row * this.rowSize;
    this.width = this.colSize;
    this.height = this.rowSize;
};

var Circle = function (ray, centerX, centerY) {
	this.ray = ray;
	this.centerX = centerX;
	this.centerY = centerY;	
	this.width = ray * 2;
	this.height = ray * 2;
	this.x = centerX - ray;
	this.y = centerY - ray;
};