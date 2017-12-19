
window.onload=function(){

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var loop, canRestart, score, jumpAvailables, age;
var cars, currentCar, ties, jumping;
var addCarCounter, addCarDelay, updateDifficulty, updateJumpAvailable;
var raceSpeed, carsReachedCounter;
var warningSignal;

function start(){
	cars = [];
	ties = [];
	score = 0;
	age  = 0;
	canRestart = false;
	addCarCounter = 0;
	addCarDelay = 245;
	raceSpeed = 1;
	updateDifficulty = false;
	updateJumpAvailable = false;
	jumping = false;
	carsReachedCounter = 0;
	jumpAvailables = 2;
	warningSignal = new Signal(20,H-50,COLOR.YELLOW);
	currentCar = new Car((W - CAR_CONFIG.CAR.W * BW) / 2, H - (CAR_CONFIG.CAR.H + 5) * BW, COLOR.RED);
	currentCar.speed = PLAYER_SPEED;
	addTies();
	loop=setInterval(update,FPS);
}

function update(){
	if(addCarCounter++ > addCarDelay){
		addCarCounter = 0;
		addCar();
	}
	
 	for (var i = 0; i < cars.length; i++) {
		if ((cars[i].y > H && cars[i].speed > 0) || (cars[i].y < 0 && cars[i].speed < 0)) {
			if (!cars[i].destroyed) {
				score += 10 * cars[i].height;
				carsReachedCounter++;
				updateDifficulty = true;
				updateJumpAvailable = true;
			}
			cars[i] = null;		
			cars.splice(i, 1);
			i--;
		} else {
			cars[i].moveBy(0, raceSpeed * cars[i].speed);
			if (cars[i].destroyed && cars[i].destroyedAge++ % 5 == 0) cars[i].toggleColor();
		}
	}	
	
	for (var i = 0; i < ties.length; i++) {
		if (ties[i].y >= H) {
			ties[i].y = - H * 1 / 3;
		} else {
			ties[i].y += raceSpeed * 3;
		}
	}
	
	if (updateDifficulty == true && addCarDelay > ADD_CAR_DELAY_LIMIT && carsReachedCounter > 0 && carsReachedCounter % DIFFICULTY_PERIOD == 0){
		addCarDelay -= ADD_CAR_DELAY_DECREASE;
		raceSpeed += RACE_SPEED_INCREASE;
		updateDifficulty = false;
	}
	
	if (updateJumpAvailable == true && carsReachedCounter > 0 && carsReachedCounter % ADD_JUMP_PERIOD == 0) {
		if (jumpAvailables < 99) {
			jumpAvailables++;
		}
		updateJumpAvailable = false;
	}
	
	if (warningSignal.counter > 0 && age % FPS == 0) {
		 warningSignal.counter--;
	}

	draw();	
	checkCollisions();
	age++;
}

function checkCollisions () {
	for (var i = 0; i < cars.length; i++) {
		if (jumping == false && cars[i].intersects(currentCar)){
			currentCar.destroyed = true;
			cars[i].destroyed = true;
			clearInterval(loop);
			gameOver();
			return false;
		}
		
		for (var j = 0; j < cars.length; j++) {
			if (i != j && cars[i].intersects(cars[j])) {
				cars[i].onCollision();
				cars[j].onCollision();
				continue;
			}
		}
	}
	return true;
}

function move(dx,dy){
	if (canRestart == true) {
		 return start();
	}

	var x = currentCar.x + dx * currentCar.speed;
	var y = currentCar.y + dy * currentCar.speed;
	var px = dx * currentCar.speed;
	var py = dy * currentCar.speed;
	
	if (x < 0) {
		px = -currentCar.x;
	} else if (x + currentCar.width * BW > W) {
		px = W - (currentCar.x + currentCar.width * BW);
	}
	
	if (y < 0) {
		py = -currentCar.y;
	} else if (y + currentCar.height * BW > H) {
		py = H - (currentCar.y + currentCar.height * BW);
	}
	currentCar.moveBy(px, py);
}

function jump(){
	if (canRestart == true) {
		 return start();
	}
	if (jumping == true|| jumpAvailables == 0 && canRestart == false) {
		return false;
	}
	
	var currentScale = 1;
	var done = 0;
	var raceSpeedOld = raceSpeed;
	var playerSpeedOld = currentCar.speed;
	var step = [
		{from: 1, to: 1.2, duration: 2, counter: 0}, 
		{from: 1.2, to: 1.28, duration: 3, counter: 0}, 
		{from: 1.28, to: 1.35, duration: 4, counter: 0}, 
		{from: 1.35, to: 1.35, duration: 4, counter: 0}, 
		{from: 1.35, to: 1.28, duration: 3, counter: 0}, 
		{from: 1.28, to: 1.2, duration: 3, counter: 0}, 
		{from: 1.2, to: 1, duration: 2, counter: 0} 
	];
		
	var thJump = setInterval(function () {
		done = 0;
		
		for(var i = 0; i < step.length; i++){
			if (step[i].counter < step[i].duration) {
				step[i].counter++;
				currentScale += (step[i].to - step[i].from) / step[i].duration;
				currentCar.scaleTo(currentScale);
				currentCar.moveBy((step[i].to - step[i].from) * BW * -0.7, (step[i].to - step[i].from) * BW * -0.8);
				break;
			} else {
				done++;
			}
		}
		
		if (done == step.length) {
			raceSpeed = raceSpeedOld;
			currentCar.speed = playerSpeedOld;
			jumping = false;
			clearInterval(thJump);
		}
	}, 80);
	
	raceSpeed *= 0.7;
	currentCar.speed *= 0.4;
	jumpAvailables--;
	jumping = true;
}

function addCar(){
	var randomConfig = CAR_CONFIG.random();
	var randomX = 0;
	var n = Math.random();
	var sectionWidth = W / 3; 
	var y = -randomConfig.H * BW;
		
	if (currentCar.x <= sectionWidth) {
		randomX = sectionWidth * Math.floor((n < 0.6) ? 0 : n * 2);//0 ou 100
	} else if (currentCar.x > sectionWidth && currentCar.x <= 2 * sectionWidth) {
		randomX = sectionWidth * Math.floor((n < 0.5) ? 1 : n * 3);//0, 100 ou 200
	} else if (currentCar.x > 2 * sectionWidth) {
		randomX = sectionWidth + sectionWidth * Math.floor((n > 0.4) ? 1 : n * 2);//100 ou 200
	}

	if (randomConfig.ID == 4) {
		y = 2 * H;
		warningSignal.counter = 5;
		warningSignal.x = randomX + (sectionWidth - warningSignal.blockWidth) / 2 ;
	}
	
	randomX += (sectionWidth - (randomConfig.W * BW)) / 2;//centralizando o carro na lacuna 	
	var car = new Car(randomX, y, COLOR.random(), randomConfig);
	cars.push(car);
}

function addTies(){
	var tieLeft1 = new Tie(W / 3, - H * 1 / 3);
	var tieLeft2 = new Tie(W / 3, H * 0 / 3);
	var tieLeft3 = new Tie(W / 3, H * 1 / 3);
	var tieLeft4 = new Tie(W / 3, H * 2 / 3);
	var tieRight1 = new Tie(2 * W / 3, - H * 1 / 3);
	var tieRight2 = new Tie(2 * W / 3, H * 0 / 3);
	var tieRight3 = new Tie(2 * W / 3, H * 1 / 3);
	var tieRight4 = new Tie(2 * W / 3, H * 2 / 3);
	ties.push(tieLeft1, tieLeft2, tieLeft3, tieLeft4, tieRight1, tieRight2, tieRight3, tieRight4);	
}

function draw(){
	clear();
	for (var i = 0; i < ties.length; i++) {
			ctx.fillStyle= COLOR.WHITE;
			ctx.fillRect(ties[i].x,ties[i].y,ties[i].width,ties[i].height);		
	}
	for(var i=0;i<cars.length;i++){
		for(var j in cars[i].blocks){ 		
			ctx.fillStyle=cars[i].blocks[j].color;
			ctx.fillRect(cars[i].blocks[j].x,cars[i].blocks[j].y,BW,BW);
		}
	}
	if(currentCar!=undefined){
		for(var j in currentCar.blocks){ 		
			ctx.fillStyle= currentCar.blocks[j].color;
			ctx.fillRect(currentCar.blocks[j].x,currentCar.blocks[j].y, currentCar.blocks[j].width, currentCar.blocks[j].height);
		}
	}
	if (warningSignal.counter > 0) {
		for (var i =0; i < warningSignal.height; i++) {
			if (warningSignal.blocks[i] == 1) {
				ctx.fillStyle = warningSignal.color;
				ctx.fillRect(warningSignal.x, warningSignal.y + i * warningSignal.blockWidth, warningSignal.blockWidth, warningSignal.blockWidth);
			}
		}
	}

	ctx.font = "16px Monospaced";	
	ctx.fillStyle =  COLOR.BLACK;
	ctx.fillText("Pontos: " + ("00000" + score).slice(-5) + " | Pulos: " + ("00" + jumpAvailables).slice(-2), 7, 21);
	ctx.fillStyle =  COLOR.WHITE;
	ctx.fillText("Pontos: " + ("00000" + score).slice(-5) + " | Pulos: " + ("00" + jumpAvailables).slice(-2), 5, 19);

	ctx.fillStyle =  COLOR.BLACK;
	ctx.fillText((raceSpeed * 60).toFixed(2)+ "mph", W - 88, H - 10);
	ctx.fillStyle =  COLOR.GREEN;
	ctx.fillText((raceSpeed * 60).toFixed(2)+ "mph", W - 90, H - 12);
}

function addInputs(){
	window.addEventListener("keydown",function(e){
		if(e.keyCode==KEYS.LEFT) move(-1,0);
		if(e.keyCode==KEYS.UP) move(0,-1);
		if(e.keyCode==KEYS.RIGHT) move(1,0);
		if(e.keyCode==KEYS.DOWN) move(0,1);
		if(e.keyCode==KEYS.JUMP) jump();
	});
}

function gameOver(){
	ctx.font="26px Serif";
	ctx.fillStyle=COLOR.BLACK;
	ctx.fillText("GAME OVER", W/2-72, H/2-10);
	ctx.fillStyle=COLOR.WHITE;
	ctx.fillText("GAME OVER", W/2-70, H/2-8);
	setTimeout(function(){canRestart=true;},3000);
}

function clear(){
	ctx.clearRect(0,0,W,H);
	ctx.fillStyle=COLOR.GREY;
	ctx.fillRect(0,0,W,H);
}
	
addInputs();
start();
}; 
