const COLOR = {
	"R":"#f00","G":"#0f0","B":"#00f",
	"Y":"#ff0","P":"#f0f","C":"#0ff",
	"length":6,"index":0,
	random:function(){
		return this[["R","G","B","Y","P","C"][this.index++ % this.length]];
	}};
const W = 300, H = 400, FPS = 20, BW = 20;
const RESPAWN_TOP = -2 * BW;
const PIECES_PER_ROW = W / BW;
const SCORE = {"UNIT":5,"ROW":30};

window.onload=function(){

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var loop, canRestart, score;
var moveDelayCounter, moveDelayTarget;
var pieces, currentPiece;
var dx, dy;

function start(){
	moveDelayCounter=0;
	moveDelayTarget=30;
	pieces = [];
	dx = dy = score = 0;
	addInputs();
	canRestart = false;
	currentPiece = undefined;
	loop=setInterval(update,FPS);
}

function update(){

	if(dx != 0){
		if(!currentPiece.isFixed && ((currentPiece.getBounds().x >= BW && dx == -1) || (currentPiece.getBounds().x2 <= W - BW && dx == 1))){
			currentPiece.moveX(dx);
			dx = 0;
		}
	}
	
	if(dy == 1){
		dy = 0;
		if(!currentPiece.isFixed){
			while(!fixPiece(currentPiece)){
				currentPiece.moveDown();
			}
		}
	}else 
	if(dy == -1){
		dy = 0;
		if(currentPiece.type != PIECE_TYPE.Q && !currentPiece.isFixed && !nextRotationIntersects()){
			currentPiece.rotate();
		}
	}
	
	if(moveDelayCounter++ > moveDelayTarget){
		moveDelayCounter = 0;
	
		if(pieces.length > 0){
			if(!currentPiece.isFixed){
				if(fixPiece(currentPiece)){
					currentPiece.isFixed=true;
					score += SCORE.UNIT;
					completeRows();
					if(currentPiece.getBounds().y > 0){
						currentPiece=addPiece();
					}else{
						gameOver();
						clearInterval(loop);
					}
				}else{
					currentPiece.moveDown();
				}
			}
		}else{
			currentPiece=addPiece();
		}
		
		draw();
	}
}

function addPiece(){
	var left = Math.floor(W/2/BW)*BW + Math.pow(-1, Math.floor(Math.random() * 2)) * BW;
	var piece = new Piece(left, RESPAWN_TOP, COLOR.random(), PIECE_TYPE.random());
	pieces.push(piece);
	return piece;
}

function draw(){
	clear();
	for(var i=0;i<pieces.length;i++){
		ctx.fillStyle=pieces[i].color;
		for(var j in pieces[i].blocks){
			ctx.fillRect(pieces[i].blocks[j].x,pieces[i].blocks[j].y,BW,BW);
		}
	}
	ctx.fillStyle="#fff";
	ctx.fillText("Pontos: " + score, 5, 15);
}

function addInputs(){
	document.getElementById("up").addEventListener("click",function(e){changeDir(0,-1);});
	document.getElementById("down").addEventListener("click",function(e){changeDir(0,1);});
	document.getElementById("left").addEventListener("click",function(e){changeDir(-1,0);});
	document.getElementById("right").addEventListener("click",function(e){changeDir(1,0);});
	window.addEventListener("keyup",function(e){
		if(e.keyCode==37) changeDir(-1,0);
		if(e.keyCode==38) changeDir(0,-1);
		if(e.keyCode==39) changeDir(1,0);
		if(e.keyCode==40) changeDir(0,1);
	});
}

function gameOver(){
	ctx.fillStyle="#fff";
	ctx.font="Arial 25px";
	ctx.fillText("GAME OVER", W/2-30, H/2-10);
	setTimeout(function(){canRestart=true;},3000);
}

function nextRotationIntersects(){
	var rotation = (currentPiece.rotation + 1 == PIECE_ROTATION[currentPiece.type].length) ? 0 : currentPiece.rotation + 1;
	var nextBlocks = PIECE_ROTATION[currentPiece.type][rotation];
	var blocks = currentPiece.blocks, x, y;
	 
	for(var i=1;i<blocks.length;i++){
		x = blocks[i].x + nextBlocks[i-1].x * BW;
		y = blocks[i].y + nextBlocks[i-1].y * BW;
		if(x < 0 || x >= W || y < 0 || y > H){
			return true;
		}
	}
	
	for(var i=0;i<pieces.length;i++){
		if(pieces[i].isFixed==true){
			for(var j=0;j<pieces[i].blocks.length;j++){
				for(var k=0;k<blocks.length;k++){
					x = blocks[k].x + ((k > 0) ? nextBlocks[k-1].x * BW : 0);
					y = blocks[k].y + ((k > 0) ? nextBlocks[k-1].y * BW : 0);
					
					if(pieces[i].blocks[j].x == x && pieces[i].blocks[j].y == y){
						return true;
					}
				}
			}
		}
	}
	 
	return false;
}
	
function changeDir(mx,my){
	if(canRestart) return start();
	dx = mx;
	dy = my;
}

function intersectPieces(piece1, piece2){
	for(var i in piece1.blocks){
		for(var j in piece2.blocks){
			if(piece1.blocks[i].x == piece2.blocks[j].x && piece1.blocks[i].y == piece2.blocks[j].y2){
				return true;
			}
		}
	}
	return false;
}

function fixPiece(piece){ 
	for(var i=0;i<piece.blocks.length;i++){
		if(piece.blocks[i].y2 >= H){
			return true;
		}
	}

	for(var i=0;i<pieces.length;i++){
		if(pieces[i].isFixed && intersectPieces(pieces[i], piece)){
			return true;
		}
	}
	return false;
}

function completeRows(){
	var fixeds = {}, blocks;
	for(var i in pieces){
		if(pieces[i].isFixed){
			blocks = pieces[i].blocks;
			for(var j in blocks){
				if(fixeds[blocks[j].y] != undefined){
					fixeds[blocks[j].y]++;
					if(fixeds[blocks[j].y] == PIECES_PER_ROW){
						clearRow(blocks[j].y);
						score += SCORE.ROW;
					}
				}else{
					fixeds[blocks[j].y]=1;
				}
			}
		}
	}
}

function clearRow(y){
	for(var i in pieces){
		for(var j=0;j< pieces[i].blocks.length;j++){
			if(pieces[i].blocks[j].y == y){
				pieces[i].blocks.splice(j,1);
				j--;
			} 
		}
	}
	for(var i in pieces){
		for(var j in pieces[i].blocks){
			if(pieces[i].blocks[j].y < y){
				pieces[i].blocks[j].y += BW;
				pieces[i].blocks[j].y2 += BW;
			}
		}
	}
}
	
function clear(){
	ctx.clearRect(0,0,W,H);
	ctx.fillStyle="#000";
	ctx.fillRect(0,0,W,H);
}

start();
}; 