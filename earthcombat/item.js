var Item = enchant.Class.create(enchant.Sprite, {
	initialize: function (direction, y, attr) {
		enchant.Sprite.call(this, 50, 50);
		this.image = game.assets[RESOURCE.getPath("IMAGE", attr.IMAGE)];		
		this.x = (direction > 0) ? -this.width : game.width + this.width;
		this.y = y;
		this.frame = attr.FRAME;
		this.attr = attr;
		this.sprite = this;		
		game.rootScene.addChild(this);
		this.moveDirection(direction);
	},
	moveDirection: function (direction) {
		var self = this;
		var delay = 160;
		var exitPoint = (direction > 0) ? -this.width : game.width + this.width;

		this.tl
			.moveBy(game.width * 0.30 * direction, 0, delay + 20)
			.moveBy(-self.width * 0.20 * direction, -self.height * 0.20 * direction, delay + 30)
			.moveBy(self.width * 0.35 * direction, self.height * 0.20 * direction, delay + 30)
			.moveTo(exitPoint, self.height * 0.20, delay + 20)
			.scaleTo(0,0,8).then(function () {
				if (DEBUG)
					console.log("Perdeu o item");
				game.rootScene.removeChild(self);
				GUI.currentDropItem = undefined;
			})
	},
	activate: function (navy) {
		if (DEBUG)
			console.log("Ativando item")
		var self = this;
        this.tl.clear().scaleTo(0,0,8).then(function () {
        	self[self.attr.ACTION](navy);
        	GUI.labelScore.update(self.attr.SCORE);
            game.rootScene.removeChild(self);
            GUI.currentDropItem = undefined;
        });
	},
	increaseLifeNavy: function (navy) {
		navy.increaseLife(this.attr.VALUE);
	},
	increaseDamageNavy: function (navy) {
		navy.increaseDamage(this.attr.VALUE);
	},
	decreaseRateNavy: function (navy) {
		navy.decreaseRate(this.attr.VALUE);
	},
});