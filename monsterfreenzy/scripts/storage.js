var storage = {
	items:function(){
		return localStorage;
	},
	init:function(){

		var items = this.items();

		if(items.length == 0){
			localStorage["levelActual"] = 1;
			localStorage["levelMaxUnlocked"] = 1;
			localStorage["score"] = score_init;		
		}

		if((__x=items["levelActual"]) != 1){
			levelActual = (__x==undefined)?1:__x;
		}else{
			levelActual = 1;
		}
		if((__x=items["levelMaxUnlocked"]) != 1){
			levelMaxUnlocked = (__x==undefined)?1:__x;
		}else{
			levelMaxUnlocked = 1;
		}
		if((__x=items["score"]) != 1){
			score = (__x==undefined)?score_init:__x;
		} else {
			score = score_init;
		}	      

	},
	save:function(a,b,c){
		localStorage["levelActual"] = a;
		localStorage["levelMaxUnlocked"] = b;
		localStorage["score"] = c;
	},
	clear:function(){
		localStorage["levelActual"] = 1;
		localStorage["levelMaxUnlocked"] = 1;
		localStorage["score"] = score_init;
	}
};