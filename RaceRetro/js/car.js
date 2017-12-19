
var Car = function(x,y,color,carConfig){
	this.x=x;
	this.y=y;
	this.color=color;
	this.carConfig = carConfig || CAR_CONFIG.CAR;
	this.width=0;
	this.height=0;
	this.speed = this.carConfig.SPEED;
	this.blocks=[];
	this.destroyed = false;
	this.colorOld = this.color;
	this.colorToggled = false;
	this.destroyedAge = 0;
	
	Car.prototype.build=function(){		
		this.width = this.carConfig.W;
		this.height = this.carConfig.H;
		this.blocks = [];
		var color;
		
		for (var i = 0; i < this.height; i++){
			for (var j = 0; j < this.width; j++){
				if(this.carConfig.POS[i][j] != 0){
					if (this.carConfig.POS[i][j] == 1 || (this.destroyed == true && this.colorToggled == true)) {
						 color = this.color;
					} else if (this.carConfig.POS[i][j] > 1) {
						 color = COLOR.getColor(this.carConfig.POS[i][j]);
					}
					
					this.blocks.push(new Block(this.x + j * BW, this.y + i * BW, color));
				}
			}
		} 	
	};
	
	Car.prototype.moveBy = function(dx,dy){
		this.x += dx;
		this.y += dy;
		for(var i in this.blocks){
			this.blocks[i].moveBy(dx, dy);
		}
	};
	
	Car.prototype.scaleTo = function (scale) {
		this.blocks = [];
		
		for (var i = 0; i < this.height; i++){
			for (var j = 0; j < this.width; j++){
				if(this.carConfig.POS[i][j] != 0){
					if (this.carConfig.POS[i][j] == 1) {
						 color = this.color;
					} else if (this.carConfig.POS[i][j] > 1) {
						 color = COLOR.getColor(this.carConfig.POS[i][j]);
					}
					
					this.blocks.push(new Block(this.x + j * BW * scale, this.y + i * BW * scale , color, BW * scale , BW * scale ));
				}
			}
		} 	
	};
	
	Car.prototype.intersects = function (car2) {
		for (var i in this.blocks) {
			for (var j in car2.blocks) {
				if (this.blocks[i].rectInRect(car2.blocks[j])) {
					return true;
				}
			}
		}
		return false;
	};
	
	Car.prototype.onCollision = function () {
		this.destroyed = true;
		this.speed = 1;
		this.toggleColor();
	};
	
	Car.prototype.toggleColor = function () {
		if (this.colorToggled) {
			this.colorOld = this.color;
			this.color = "transparent";
		}else{
			this.color = this.colorOld;
		}
		
		this.build();
		this.colorToggled = !this.colorToggled;
	};
	
	this.build();
};