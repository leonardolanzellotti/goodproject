var Plain = enchant.Class.create(enchant.Group,{
	initialize:function(row,col,blockTypes,blockGoals,iceLayer){
	  enchant.Group.call(this);
	  this.row = row;
	  this.col = col;
	  
	  this.width = this.col*80;
	  this.height = this.row*80;
	  
	  this.x = (game.width-this.width)/2;
	  this.y = (game.height-this.height)/2;
	  
	  this.blockTypes = (blockTypes == undefined)?[0]:blockTypes;
	  this.cell = [];
	  this.iceLayer = [];
	  
	  this.path = [];
	  this.frame = -1;
	  this.unInk = false;
	  
	  this.blockGoalsPosX = [];
	  this.blockGoalsPosY = 20;
	  
	  this.blockGoals = blockGoals;
	  this.validTypeGoals = [];
	  this.moves = 0;
	  
	  for(var r=0;r<this.row;r++){
	var __cell__ = [];
	var __ice__ = [];
	for(var c=0;c<this.col;c++){
	  __cell__.push(undefined);
	  __ice__.push(false);
	  
	}
	this.cell.push(__cell__);
	this.iceLayer.push(__ice__);
	  }
	  
	  this.iceLayerCounter = 0;
	  for(var i=0;i<iceLayer.length;i++){
	this.iceLayer[iceLayer[i][0]][iceLayer[i][1]] = true;
	this.iceLayerCounter++;
	  }
	  
	  this.iceLayerBefore = new Group();
	  this.iceLayerBefore.width = this.width;
	  this.iceLayerBefore.height = this.height;
	  this.addChild(this.iceLayerBefore);
	  
	  var bg = new Label();
	  bg.backgroundColor = "rgba(0,0,0,0.7)";
	  bg.width = this.width;
	  bg.height = this.height;
	  this.addChild(bg);
	  
	  this.iceLayerAfter = new Group();
	  this.iceLayerAfter.x = this.x;
	  this.iceLayerAfter.y = this.y;
	  this.iceLayerAfter.width = this.width;
	  this.iceLayerAfter.height = this.height;
	  //this.addChild(this.iceLayerAfter);
	  
	  this.witch = undefined;
	  
	  //console.log(this.row,this.col,this.x,this.y,this.width,this.height,this.blockTypes,this.cell,this.iceLayer);
	  game.rootScene.addChild(this);
	  game.rootScene.addChild(this.iceLayerAfter);
	  this.goals();
	  this.movesLabel();
	  this.pathLengthLabel();
	  this.refreshIceLayer();
	  this.buttons();
	  
	},
	turnOn:function(){

	  for(var r=0;r<this.row;r++){
	for(var c=0;c<this.col;c++){

	  if(this.cell[r][c] != undefined && this.iceLayer[r][c] == false && this.cell[r][c].frame != 15){
	    
	    this.cell[r][c].backgroundColor = 'rgba(200,200,40,0.7)';
	    
	  }

	}
	  }

	},
	turnOff:function(){

	  for(var r=0;r<this.row;r++){
	for(var c=0;c<this.col;c++){

	  if(this.cell[r][c] != undefined && this.iceLayer[r][c] == false && this.cell[r][c].frame != 15){
	    
	    this.cell[r][c].backgroundColor = 'rgba(0,0,0,0)';
	    
	  }

	}
	  }

	},
	noIce:function(){

	  var condition = false;

	  for(var r=0;r<this.row;r++){
	for(var c=0;c<this.col;c++){

	  if ( this.iceLayer[r][c] == true){
	    condition = true;
	  }
	}
	  }
	  
	  if(condition == false){
	  
	alert("Nao ha gelo neste level!");
	return;
	  
	  }
	  
	  if ((confirm("Retirar todo o gelo. \n Custo: "+__COST_NO_ICE__+" scores. \n Seu score: "+score)) && score >= __COST_NO_ICE__) {
	score -= __COST_NO_ICE__;
	  }else{
	return;
	  }
	  
	  for(var r=0;r<this.row;r++){
	for(var c=0;c<this.col;c++){
	  this.iceLayer[r][c] = false;
	}
	  }
	  
	  this.refreshIceLayer();

	},
	removeOne:function(b){

	  if(this.cell[b[0]][b[1]] != undefined && this.iceLayer[b[0]][b[1]] == false && this.cell[b[0]][b[1]].frame != 15){
	this.takeCell(b);
	  }

	},
	collectSame:function(b){

	  if(this.cell[b[0]][b[1]] != undefined && this.iceLayer[b[0]][b[1]] == false && this.cell[b[0]][b[1]].frame != 15){
	  
	var frame = this.cell[b[0]][b[1]].frame;

	for(var r=0;r<this.row;r++){		
	  for(var c=0;c<this.col;c++){
	  
	    if(this.cell[r][c] != undefined && this.cell[r][c].frame == frame && this.cell[r][c] != undefined && this.iceLayer[r][c] == false && this.cell[r][c].frame != 15){		    
	      this.takeCell([r,c]);
	    }
	  }		
	}
	  		
	  }

	},
	changeCells:function(cell1,cell2){
	  
	  var tmp = this.cell[cell1[0]][cell1[1]].frame;
	  this.cell[cell1[0]][cell1[1]].frame = this.cell[cell2[0]][cell2[1]].frame;
	  this.cell[cell2[0]][cell2[1]].frame = tmp;
	  
	  this.cell[cell1[0]][cell1[1]].visible = false;
	  this.cell[cell2[0]][cell2[1]].visible = false;
	  
	  var obj1 = this.cell[cell1[0]][cell1[1]];
	  var obj2 = this.cell[cell2[0]][cell2[1]];
	  
	  var clone;
	  
	  clone = new Sprite(this.cell[cell1[0]][cell1[1]].width,this.cell[cell1[0]][cell1[1]].height);
	  clone.x = this.x+this.cell[cell1[0]][cell1[1]].x;
	  clone.y = this.y+this.cell[cell1[0]][cell1[1]].y;
	  clone.image = this.cell[cell1[0]][cell1[1]].image;
	  clone.frame = this.cell[cell1[0]][cell1[1]].frame;
	  
	  game.rootScene.addChild(clone);
	  
	  clone.tl.delay(1+Math.floor(Math.random()*3)).moveTo(this.x+this.cell[cell2[0]][cell2[1]].x,this.y+this.cell[cell2[0]][cell2[1]].y,3).then(function(){
	obj2.visible = true;
	game.rootScene.removeChild(this);
	  });
	  
	  clone = new Sprite(this.cell[cell2[0]][cell2[1]].width,this.cell[cell2[0]][cell2[1]].height);
	  clone.x = this.x+this.cell[cell2[0]][cell2[1]].x;
	  clone.y = this.y+this.cell[cell2[0]][cell2[1]].y;
	  clone.image = this.cell[cell2[0]][cell2[1]].image;
	  clone.frame = this.cell[cell2[0]][cell2[1]].frame;
	  
	  game.rootScene.addChild(clone);
	  
	  clone.tl.delay(1+Math.floor(Math.random()*3)).moveTo(this.x+this.cell[cell1[0]][cell1[1]].x,this.y+this.cell[cell1[0]][cell1[1]].y,3).then(function(){
	obj1.visible = true;
	game.rootScene.removeChild(this);
	  });

	},
	randomCells:function(){

	  if ((confirm("Deseja embaralhar o tabuleiro? \n Custo: "+__COST_RANDOM__+" scores. \n Seu score: "+score)) && score >= __COST_RANDOM__) {
	score -= __COST_RANDOM__;
	  }else{
	return;
	  }
	  
	  var possibles = [];
	  
	  for(var r=0;r<this.row;r++){
	for(var c=0;c<this.col;c++){
	  //if(this.cell[r][c] != undefined){
	  if(this.cell[r][c] != undefined && this.cell[r][c].frame != 15 && this.iceLayer[r][c] == false){
	    possibles.push([r,c]);
	  }
	}
	  }
	  
	  
	  //idea: take an element which have 3 or more.
	  //put their in 0,1,2 positions possibles
	  //never will to stay out moves!!
	  
	// 	      var possiblePath = [
	// 		[['r','c'],['r','c+1'],['r','c+2']],
	// 		[['r','c'],['r+1','c'],['r+2','c']],
	// 		[['r','c'],['r+1','c'],['r+1','c+1']],
	// 		[['r','c'],['r+1','c+1'],['r+2','c+2']],
	// 		[['r','c'],['r-1','c+1'],['r-1','c+2']]
	// 	      ];
	  
	// 	      for(var i in possibles){
	// 		var r = possibles[i][0];
	// 		var c = possibles[i][1];
	// 		
	// 	      }
	  
	  var frameElements = possibles.map(function(p){return plain.cell[p[0]][p[1]].frame;});
	  var frameElementsSort = (frameElements.map(function(k){return k;})).sort();
	  var frameElementsCount = frameElementsSort.map(function(p){return [p,count(frameElementsSort,p)]});
	  
	  for(var i in frameElementsCount){
	if(frameElementsCount[i][1] >= 3){
	  
	  var pos,r1,r2;
	  var dpos = 0;
	  //--1
	  
	  pos = frameElements.indexOf(frameElementsCount[i][0],dpos);
	  dpos = pos+1;		  
	  r1 = possibles[pos];
	  r2 = possibles[0];
	  this.changeCells(r1,r2);
	  
	  //--2
	  
	  pos = frameElements.indexOf(frameElementsCount[i][0],dpos);
	  dpos = pos+1;		  
	  r1 = possibles[pos];
	  r2 = possibles[1];
	  this.changeCells(r1,r2);
	  
	  //--3
	  
	  pos = frameElements.indexOf(frameElementsCount[i][0],dpos);
	  dpos = pos+1;		  
	  r1 = possibles[pos];
	  r2 = possibles[2];
	  this.changeCells(r1,r2);
	  
	  //--
	  possibles.splice(0,1);
	  possibles.splice(0,1);
		  possibles.splice(0,1);
	  
	  break;
	}
	  }
	  
	  var limit = 50000;
	  
	  while((limit-- >= 0) && possibles.length > 1){
	  
	var r1 = possibles[Math.floor(Math.random()*possibles.length)];
	var r2 = possibles[Math.floor(Math.random()*possibles.length)];

	if(r1 != r2){

	  this.changeCells(r1,r2);
	  //console.log("change = ",r1," com ",r2);
	  possibles.splice(possibles.indexOf(r1),1);
	  possibles.splice(possibles.indexOf(r2),1);

	}

	  
	  }

	  

	},
	buttons:function(){
	  
	  back({x:10,y:game.height-10-80,scale:0.8});
	  restart({x:90,y:game.height-10-80,scale:0.8});
	  music({x:12,y:game.height-10-80-70,scale:0.7});
	  if(this.iceLayerCounter > 0){
	noIce({x:230,y:game.height-10-80,scale:0.7});
	  }
	  if(levelActual > 50){
	removeOne({x:310,y:game.height-10-80,scale:0.7});
	  }
	  if(levelActual > 75){
	collectSame({x:395,y:game.height-10-80,scale:0.8});
	  }
	  
	},
	absorb:function(arr){
	  
	  var k = 0;
	  for(var i in arr){
	  
	if(this.cell[arr[i][0]][arr[i][1]] != undefined){

	    var clone = new Sprite(80,80);
	    clone.x = plain.x+this.cell[arr[i][0]][arr[i][1]].x;
	    clone.y = plain.y+this.cell[arr[i][0]][arr[i][1]].y;
	    clone.image = this.cell[arr[i][0]][arr[i][1]].image;
	    clone.frame = this.cell[arr[i][0]][arr[i][1]].frame;
	    game.rootScene.addChild(clone);

	    plain.cell[arr[i][0]][arr[i][1]]._visible = false;
	    
	    clone.tl.
	    scaleTo(1.0,1.0,1).rotateBy(45,2,undefined).
	    scaleTo(0.9,0.9,1).rotateBy(45,2,undefined).
	    scaleTo(0.8,0.8,1).rotateBy(45,1,undefined).
	    scaleTo(0.7,0.7,1).rotateBy(45,1,undefined).
	    scaleTo(0.6,0.6,1).rotateBy(45,1,undefined).
	    scaleTo(0.5,0.5,1).rotateBy(45,1,undefined).
	    scaleTo(0.4,0.4,1).rotateBy(45,1,undefined).
	    scaleTo(0.3,0.3,1).rotateBy(45,1,undefined).
	    then(function(){
	      plain.removeChild(plain.cell[arr[k][0]][arr[k][1]]);
	      plain.cell[arr[k][0]][arr[k][1]] = undefined;
	      game.rootScene.removeChild(this);
	      k++;
	    });
	}
	  
	  }
	  
	  plain.inkCells([]);
	  

	},		      
	specialTile:function(p){

	  var s = new Sprite(80,80);
	  s.image = game.assets["specialTile.png"];
	  //s.frame = [0,0,0,0,1,1,1,1,2,2,2,2];
	  s.frame = 0;
	  s.x = p[1]*80;
	  s.y = p[0]*80;
	  this.addChild(s);
	  s.tl.fadeOut(15).then(function(){
	plain.removeChild(this);
	  });

	},
	watermelon:function(p){

	  var r = p[0];
	  var c = p[1];
	      
	  var spr = new Sprite(107,80);
	  spr.image = game.assets["WatermelonSpecial107x80.png"];
	  spr.frame = [0,0,1,1,2,2,3,3,4,4];
	  spr.x = plain.x+c*80-(107-80)/2;
	  spr.y = plain.y+r*80;
	  game.rootScene.addChild(spr);
	  
	  spr.tl.scaleTo(1.5,1.5,5).scaleTo(1.2,1.2,5).then(function(){
	game.rootScene.removeChild(this);	    
	  });
	  
	  var lbl = new Sprite(200,23);
	  lbl.image = game.assets["MessageBombWatermelon200x23.png"];
	  lbl.frame = 0;
	  lbl.x = (game.width-200)/2;
	  lbl.y = (game.height-23)/2;
	  lbl.scaleX = 2;
	  lbl.scaleY = 2;
	  game.rootScene.addChild(lbl);
	  
	  lbl.tl.scaleTo(2.5,3.8,12).moveBy(0,12,10).scaleTo(2,2,5).moveTo(lbl.x,0,5).then(function(){
	game.rootScene.removeChild(this);	    
	  });
	  
	  this.tl.delay(10).then(function(){
	var arr = [
	  [r-1,c-1],[r-1,c],[r-1,c+1],
	  [r,c-1],[r,c],[r,c+1],
	  [r+1,c-1],[r+1,c],[r+1,c+1]
	];

	for(var i in arr){
	  if(arr[i][0] > -1 && arr[i][0] < this.row && arr[i][1] > -1 && arr[i][1] < this.col && this.cell[arr[i][0]][arr[i][1]] != undefined){
	    if(this.iceLayer[arr[i][0]][arr[i][1]] == false){//dont take the ice cells!
	      this.specialTile(arr[i]);
	      this.takeCell(arr[i]);
	    }
	  }
	}

			
	  });
	  	      
	  __score__ += 5;
	  
	},
	pumpking:function(p){

	  var r = p[0];
	  var c = p[1];
	  
	  var spr = new Sprite(26,26);
	  spr.image = game.assets["PumpkinSpecial26x26.png"];
	  spr.frame = [0,1,2,3,4,5,6,7,8,9,10,11];
	  spr.x = plain.x+c*80-(26-80)/2;
	  spr.y = plain.y+r*80;
	  spr.scaleX = 2;
	  spr.scaleY = 2;
	  game.rootScene.addChild(spr);
	  
	  spr.tl.scaleTo(2.5,2.5,6).scaleTo(2,2,6).then(function(){
	game.rootScene.removeChild(this);	    
	  });
	  
	  var lbl = new Sprite(200,26);
	  lbl.image = game.assets["MessageFlashPumpkin200x26.png"];
	  lbl.frame = 0;
	  lbl.x = (game.width-200)/2;
	  lbl.y = (game.height-26)/2;
	  lbl.scaleX = 2;
	  lbl.scaleY = 2;
	  game.rootScene.addChild(lbl);
	  
	  lbl.tl.scaleTo(2.5,3.8,12).moveBy(0,12,10).scaleTo(2,2,5).moveTo(lbl.x,0,5).then(function(){
	game.rootScene.removeChild(this);	    
	  });
	  
	  this.tl.delay(12).then(function(){
	var arr = [
	  [r,c-4],[r,c-3],[r,c-2],[r,c-1],[r,c],[r,c+1],[r,c+2],[r,c+3],[r,c+4],
	  [r-4,c],[r-3,c],[r-2,c],[r-1,c],[r+1,c],[r+2,c],[r+3,c],[r+4,c]
	];

	for(var i in arr){
	  if(arr[i][0] > -1 && arr[i][0] < this.row && arr[i][1] > -1 && arr[i][1] < this.col && this.cell[arr[i][0]][arr[i][1]] != undefined){
	    if(this.iceLayer[arr[i][0]][arr[i][1]] == false){//dont take the ice cells!
	      this.specialTile(arr[i]);
	      this.takeCell(arr[i]);
	    }
	  }
	}
	  });

	  __score__ += 10;

	},
	check:function(){

	  var nGoals = 0;
	  for(var i in this.blockGoals){
	nGoals += this.blockGoals[i];
	  }	    

	  var on = 0;
		    
	  if(this.moves >= 0 && nGoals == 0){
	  
	on = 1;

	//console.log("win");
	if(levelMaxUnlocked == levelActual && levelMaxUnlocked < __monsterLevel__[__monsterLevel__.length-1][1]){
	  levelMaxUnlocked++;
	}
	levelActual = levelMaxUnlocked;
	__score__ += parseInt((this.moves*20));
	score -= (-__score__);
		
	check_wait = false;

	winner();		

	var kxx = setInterval(function(){
	  
	  if(check_wait){
	    main();
	    clearInterval(kxx);
	  }
	  
	},100);

	// 		main();
	// 		return;
	  }

	  if( on != 1 && this.moves <= 0){
	//console.log("lose");
	check_wait = false;

	loser();		

	var kxx = setInterval(function(){
	  
	  if(check_wait){
	    main();
	    clearInterval(kxx);
	  }
	  
	},100);

	return;
	  }
	  
	  //console.log("playing");	    

	},
	refreshIceLayer:function(){
	  
	  var len = 0;
	  
	  len = this.iceLayerBefore.childNodes.length;
	  for(var i=0;i<len;i++){
	this.iceLayerBefore.removeChild(this.iceLayerBefore.childNodes[0]);
	  }
	  
	  len = this.iceLayerAfter.childNodes.length;
	  for(var i=0;i<len;i++){
	this.iceLayerAfter.removeChild(this.iceLayerAfter.childNodes[0]);
	  }
	  
	  for(var r=0;r<this.row;r++){
	for(var c=0;c<this.col;c++){
	  var spr;
	  if(this.iceLayer[r][c] == true){
	    
	    spr = new Sprite(80,80);
	    spr.x = c*80;
	    spr.y = r*80;
	    spr.image = game.assets["ice1.3.png"];
	    spr.frame = 0;
	    this.iceLayerBefore.addChild(spr);
	    
	    spr = new Sprite(80,80);
	    spr.x = c*80;
	    spr.y = r*80;
	    spr.image = game.assets["ice1.4.png"];
	    spr.frame = 0;
	    this.iceLayerAfter.addChild(spr);
	    
	  }
	}
	  }
	},
	takeCell:function(b){
	  /*
	If case b appoint to ice cell, just remove this ice, otherwise remove the cell, check goals...
	  */
	  
	  if(this.iceLayer[b[0]][b[1]] == true){
	  
	this.iceLayer[b[0]][b[1]] = false;
	this.refreshIceLayer();
	game.assets["ice.wav"].play();

	  }else{
		
	var i = -1;
	if(this.blockTypes.indexOf(12) >= 0){
	  i = 0;
	}else{
	  for(var v in this.validTypeGoals){
	    if(this.validTypeGoals[v][0] == this.cell[b[0]][b[1]].frame){
	      i = this.validTypeGoals[v][1];
	      break;
	    }
	  }
	}

	if(i > -1){
		
	  var nBlock = -1;
	  if((k=this.blockTypes.indexOf(12)) >= 0){
	    nBlock = k;
	  }else{
	    for(var v in this.blockTypes){
	      //if(this.blockTypes[v] == this.cell[b[0]][b[1]].frame){
	      if(this.blockTypes[v] == this.cell[b[0]][b[1]].frame){
		nBlock = v;
		break;
	      }
	    }
	  }

	  var clone = new Sprite(80,80);
	  clone.x = plain.x+this.cell[b[0]][b[1]].x;
	  clone.y = plain.y+this.cell[b[0]][b[1]].y;
	  clone.image = this.cell[b[0]][b[1]].image;
	  clone.frame = this.cell[b[0]][b[1]].frame;
	  game.rootScene.addChild(clone);
	  
	  //clone.tl.moveTo(plain.blockGoalsPosY+plain.blockGoalsPosX[i],plain.blockGoalsPosY,4).scaleTo(1.2,1.2,3).scaleTo(1,1,3).then(function(){
	  clone.tl.scaleTo(1.1,1.1,4).moveTo(plain.blockGoalsPosY+plain.blockGoalsPosX[i],plain.blockGoalsPosY,4).scaleTo(1.2,1.2,3).scaleTo(1,1,3).then(function(){
	    if(plain.blockGoals[nBlock] > 0){
	      plain.blockGoals[nBlock] -= 1;
	    }
	    if(game.assets["upMonster.ogg"]._state == 0){game.assets["upMonster.ogg"].play();}
	    game.rootScene.removeChild(this);
	  });
	}
	  
	this.removeChild(this.cell[b[0]][b[1]]);
	this.cell[b[0]][b[1]] = undefined;
	  }
	  
	},
	pathLengthLabel:function(){
	  var bg = new Label("0");
	  bg.backgroundColor = "rgba(0,0,0,0.7)";
	  bg.width = 40;
	  bg.height = 40;
	  bg.color = "white";
	  bg.font = "35px sans-serif";
	  bg.textAlign = "center";
	  bg._visible = false;
	  game.rootScene.addChild(bg);
	  this.pathLabel = bg;
	  
	},
	refreshPathLengthLabel:function(){
	  var tr = this.path[this.path.length-1][0];
	  var tc = this.path[this.path.length-1][1];
	  
	  if(tc == this.cell[0].length-1 && this.cell[0].length == 6){
	this.pathLabel.x = this.x+80*(tc)-20;
	  }else{
	this.pathLabel.x = this.x+80*(1+tc)-20;
	  }
	  this.pathLabel.y = this.y+80*(1+tr)-20;
	  this.pathLabel.text = this.path.length;
	  if(this.path.length > 14){
	this.pathLabel.color = "red";		
	  }else if(this.path.length > 6){
	this.pathLabel.color = "orange";
	  }else{
	this.pathLabel.color = "white";

	  }
	  this.pathLabel._visible = true;
	},
	movesLabel:function(){
	  var bg = new Label();
	  bg.backgroundColor = "rgba(0,0,0,0.7)";
	  bg.width = 90;
	  bg.height = 50;
	  bg.x = 370;
	  bg.y = 20;
	  bg.color = "white";
	  bg.font = "44px sans-serif";
	  bg.textAlign = "center";
	  bg.on("enterframe",function(){
	if(plain.moves >= 0){
	  this.text = plain.moves;
	}
	  });
	  game.rootScene.addChild(bg);	  
	},
	goals:function(){
	  
	  var n = 0;
	  for(var i in this.blockGoals){
	if(this.blockGoals[i] > 0){
	  this.validTypeGoals.push([this.blockTypes[i],n]);
	  n++;
	}
	  }
	  
	  //console.log(this.validTypeGoals);
	  this.blockGoalsPosX = goalsPosX[n-1];
	  
	  var g = new Group();
	  g.x = this.blockGoalsPosY;
	  g.y = this.blockGoalsPosY;
	  g.width = 330;
	  g.height = 80;
	  
	  var bg = new Label();
	  bg.backgroundColor = "rgba(0,0,0,0.7)";
	  bg.width = g.width;
	  bg.height = g.height;
	  g.addChild(bg);

	  var j = 0;
	  for(var i in this.blockGoals){
	if(this.blockGoals[i] > 0){		
	  var spr = new Sprite(80,80);
	  spr.x = this.blockGoalsPosX[j];		
	  spr.y = 0;
	  spr.image = game.assets["semgrade80x80.png"];
	  spr.frame = this.blockTypes[i];
	  spr.scale(0.8,0.8);
	  
	  g.addChild(spr);
	  
	  var num = new Label("");
	  num.x = this.blockGoalsPosX[j]+70;
	  num.y = 30;
	  num.width = 46;
	  num.height = 30;
	  num.color = "white";
	  num.textAlign = "center";
	  num.text = this.blockGoals[i];
	  num.font = "26px sans-serif";
	  num.i = i;
	  
	  num.on("enterframe",function(){
	    if(plain.blockGoals[this.i] > 0){
	      this.text = plain.blockGoals[this.i];
	    }else{
	      this.text = "ok";
	    }
	  });

	  g.addChild(num);
	  
	  j++;
	}
	  }
	  
	  game.rootScene.addChild(g);

	},
	hasEmptyCells:function(){
	  
	  for(var c=0;c<this.col;c++){
	if(this.cell[0][c] == undefined){
	  return true;
	}
	  }
	  
	  for(var r=0;r<this.row-1;r++){
	for(var c=0;c<this.col;c++){
	  //if(this.cell[r+1][c] == undefined && this.iceLayer[r][c] == false){
	  if(this.cell[r+1][c] == undefined && this.iceLayer[r][c] == false && this.cell[r][c] != undefined){
	    return true;
	  }
	}
	  }	    
	  return false;
	  
	},
	hasDownCells:function(){
	  
	  for(var r=0;r<this.row-1;r++){
	for(var c=0;c<this.col;c++){
	  if(this.cell[r+1][c] == undefined && this.iceLayer[r][c] == false && this.cell[r][c] != undefined){
	    return true;
	  }
	}
	  }	    
	  return false;
	  
	},
	inkCells:function(arr){

	  for(var r=0;r<this.row;r++){
	for(var c=0;c<this.col;c++){
	  if(this.cell[r][c] != undefined){
	    this.cell[r][c].backgroundColor = "rgba(0,0,0,0)";
	  }
	}
	  }	    

	  for(var i in arr){
	if(this.cell[arr[i][0]][arr[i][1]] != undefined){
	  this.cell[arr[i][0]][arr[i][1]].backgroundColor = "rgba(140,20,20,0.7)";
	}
	  }
	  
	},
	insertBlocksFirstRow:function(){
	  for(var c=0;c<this.col;c++){
	  
	if(this.cell[0][c] == undefined){
	  
	  var spr = new Sprite(80,80);
	  spr.x = c*80;
	  spr.y = 0;
	  spr.image = game.assets["semgrade80x80.png"];
	  if(this.blockTypes.indexOf(12) >= 0){
	    var tmp = this.blockTypes.slice(0,this.blockTypes.indexOf(12));
	    spr.frame = tmp[Math.floor(Math.random()*tmp.length)];
	  }else{
	    spr.frame = this.blockTypes[Math.floor(Math.random()*this.blockTypes.length)];
	  }
	  this.addChild(spr);
	  this.cell[0][c] = spr;
	  //spr.tl.delay(Math.floor(Math.random()*100)+100).scaleTo(1.2,1.2,3).scaleTo(0.9,0.9,3).scaleTo(1,1,2).loop();
	  
	}
	  }	  
	},
	downBlocks:function(){
	  
	  for(var r=0;r<this.row-1;r++){
	for(var c=0;c<this.col;c++){

	  if(this.cell[r][c] != undefined && this.iceLayer[r][c] == false){
	  
	    var i = r*this.col + c;//iterador
	    
	    if(this.cell[r+1][c] == undefined){
	      
	      var __cell__ = this.cell[r][c];
	    //-- MODE 1		  
	      this.cell[r][c].tl.moveBy(0,80,3);
	    //-- MODE 2
	      //__cell__.y += 80;
	      this.cell[r+1][c] = __cell__;
	      this.cell[r][c] = undefined;
	      
	    //--
	    }
	    
	  }		
	  
	}
	  }	    	  
	}

	});