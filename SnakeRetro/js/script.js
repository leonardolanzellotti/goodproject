window.onload = function () {
var colors = ["#f00","#0f0","#00f","#ff0","#f0f","#0ff"];
var Point = function(x,y,color){
	this.x = x;
	this.y = y;
	this.color = color;
};
var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");
var w = 320, h = 400, viewportProportion = 0.8;
var sw = 20;
var snake = [];
var fps = 20;
var dx = 0, dy = 0;
var moveDelayCounter = 0, moveDelayTarget = 30;
var food = new Point(0,0,colors[0]);
var loop;
var canRestart = false;

function start(){
	scaleViewport();
	console.log(w, h, sw);
	cnv.width = w;
	cnv.height = h;
	dx = dy = 0;
	snake=[new Point(w/2, h/2, colors[0])];
	addFood();
	loop=setInterval(update,fps);
	addInputs();
	updateMoveDelay();
	canRestart=false;
}

function update(){
	clear();
	for(var i=0;i<snake.length;i++){
		ctx.fillStyle = snake[i].color;
		ctx.fillRect(snake[i].x, snake[i].y,sw,sw);
	}
	ctx.fillStyle = food.color;
	ctx.fillRect(food.x, food.y,sw,sw);
	ctx.fillStyle = "#fff";
	ctx.fillText("Pontos:" + (snake.length-1), 2, 10);
	if(moveDelayCounter++ > moveDelayTarget){
		moveDelayCounter=0;
		move();
		eatFood();
		if(hitSelf() || hitWall()){
			gameOver();
			clearInterval(loop);
		}
	}
}

function scaleViewport(){
	h = Math.floor(window.outerHeight * 0.7);//espaço para os botões
	w = Math.floor(h * viewportProportion); 
	
	//--> SW = Encontrar um número que seja um divisor (MDC) entre W e H.
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

function changeDir(mx,my){
	if(canRestart) return start();
	if (dx != -mx) dx = mx;
	if (dy != -my) dy = my;
}

function addPiece(){
	snake.push(new Point(snake[snake.length-1].x + dx * sw, snake[snake.length-1].y + dy * sw, food.color));
}

function addFood(){
	food.x = Math.floor(Math.random() * w / sw) * sw;
	food.y = Math.floor(Math.random() * h / sw) * sw;
	food.color = colors[Math.floor(Math.random() * colors.length)];
}

function move(){
	var newSnake = [], i = 0;
	for(i=1;i<snake.length;i++){
		newSnake.push(new Point(snake[i].x, snake[i].y,snake[i-1].color));
	}
	newSnake.push(new Point(snake[i-1].x + dx * sw, snake[i-1].y + dy * sw, snake[i-1].color));
	snake = newSnake;
}

function eatFood(){
	if(snake[snake.length-1].x == food.x && snake[snake.length-1].y == food.y){
		addPiece();
		addFood();
		updateMoveDelay();
	}
}

function updateMoveDelay(){
	var length = snake.length;
	length = (length > 50) ? 50 : length;
	moveDelayTarget=Math.floor(30 - Math.floor(length / 5) * 2.5);
	moveDelayCounter = 0;
}

function hitSelf(){
	var head = snake[snake.length-1];
	for(var i=0;i<snake.length-1;i++){
		if(snake[i].x == head.x && snake[i].y == head.y){
			return true;
		}
	}
	return false;
}

function hitWall(){
	var head = snake[snake.length-1];
	return (head.x < 0 || head.x + sw > w || head.y < 0 || head.y + sw > h);
}

function gameOver(){
	ctx.fillStyle="#fff";
	ctx.font="Arial 25px";
	ctx.fillText("GAME OVER", w/2-30, h/2-10);
	setTimeout(function(){canRestart=true;},3000);
}

function clear(){
	ctx.clearRect(0,0,w,h);
	ctx.fillStyle="#000";
	ctx.fillRect(0,0,w,h);
}

start();
};

