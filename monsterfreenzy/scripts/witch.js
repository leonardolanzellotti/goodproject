var Witch = enchant.Class.create(enchant.Sprite, {
	initialize:function(n){
		enchant.Sprite.call(this,70,50);
		this.image = game.assets["witch.png"];
		this.n = n;
		this.x = 0;
		this.y = (game.height-this.height)/2;
		this.frame = 0;
		this._visible = false;
		this.scale(-1.5,1.5);
		this.next = this.n+1;
		this.ready = true;
		game.rootScene.addChild(this);	      

		this.message();

	},
	message:function(){

		GAME_STATUS = 2;
		var g = new Group();
		g.x = -game.width;
		g.y = (game.height-120)/2-10;
		g.width = game.width;
		g.height = 120;

		var l = new Label("Cuidado");
		l.font = "40px Arial";
		l.x = 0;
		l.y = 0;
		l.width = g.width;
		l.height = g.height/2;
		l.color = "white";
		l.textAlign = "center";
		l.backgroundColor = "rgba(0,0,0,0.8)";
		g.addChild(l);

		l = new Label("BRUXA!");
		l.font = "52px sans-serif";
		l.x = 0;
		l.y = g.height/2;
		l.width = g.width;
		l.height = g.height/2;
		l.color = "red";
		l.textAlign = "center";
		l.backgroundColor = "rgba(255,255,255,0.8)";
		g.addChild(l);

		game.rootScene.addChild(g);

		g.tl.moveBy(game.width+25,0,8).moveBy(-25,0,5).delay(10).scaleTo(0.94,0.94,3).scaleTo(1.14,1.14,4).scaleTo(1,1,4).delay(10).moveBy(-25,0,5).moveBy(game.width+25,0,8)
		.then(function(){
		GAME_STATUS = 1;
		game.rootScene.removeChild(this);
		});

	},
	action: function(){

		this.next -= 1;

		if(this.next == 0){

			this.ready = false;

			var bg = new Label();
			bg.width = game.width;
			bg.height = game.height;
			bg.backgroundColor = "rgb(0,0,0)";
			bg.opacity = 0;
			game.rootScene.addChild(bg);
			bg.tl.fadeTo(0.90,42).then(function(){
				game.rootScene.removeChild(this);
			});

			this.next = this.n+1;
			this.x = 0;
			this._visible = true;

			var arr = [];
			while(arr.length < this.n){

				var r = Math.floor(Math.random()*plain.row);
				var c = Math.floor(Math.random()*plain.col);

				if(plain.cell[r][c] != undefined){
					if(plain.iceLayer[r][c] == false){
						arr.push([r,c]);
					}
				}
			}

			plain.inkCells(arr);

			this.tl.moveBy(game.width,0,25).		
				then(function(){		
					this._visible=false;
					game.assets["absorb.wav"].play();
					plain.absorb(arr);
					this.ready = true;
				});

		}
	}	
});