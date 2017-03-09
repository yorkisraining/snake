var canvas,
	cxt,
	canvas2,
	cxt2,
	canWidth,
	canHeight;

var snake;
var fruit;

var code;

var timer;

window.onload = function() {
	
	
	canvas = document.getElementById("canvas");
	cxt = canvas.getContext('2d');
	canvas2 = document.getElementById("canvas2");
	cxt2 = canvas.getContext('2d');
	canWidth = canvas.width;
	canHeight = canvas.height;
	
	init();

}

function init() {
	cxt.clearRect(0 ,0 ,canWidth, canHeight);
	fruit = new fruitObj();
	snake = new snakeObj();
	snake.init(); //初始化蛇
	snake.draw(); //画蛇

	
	code = 3;
	score();
	
}

function gameloop() {
//	window.requestAnimationFrame(gameloop);
	clearInterval(timer);
	timer = setInterval(function(){
		snake.draw();
		getCode();
		moveSnake();
		
		boom();
		score();
	}, 100);
	
}

function game() {
	init();
	gameloop();
	fruit.born();
}

var snakeObj = function() {
	this.x = []; 
	this.y = [];
	this.len; //蛇长度
	this.derect;
	this.maps = []; //蛇身坐标
	this.score;
	this.square;
}

snakeObj.prototype.init = function() {
		this.len = 10;
		this.derect = 3;
		this.score = 0;
		this.square = 10;
	for (var i=0; i<this.len; i++) {
		this.x[i] = (canWidth * 0.5) + i*this.square;
		this.y[i] = (canHeight * 0.5);
	}
}

//画蛇
snakeObj.prototype.draw = function() {
	var snakem = snake.maps;
		for(var i=0; i<snake.len; i++) {
			snakem[i] = [snake.x[i], snake.y[i]];
			if (snake.maps.lenth > snake.len) {
				snake.maps.shift();
			}
		};

	cxt.clearRect(0, 0, canWidth, canHeight);
	cxt.save();
	cxt.fillStyle = 'white';
	for (var i=0; i<this.len; i++) {
		cxt.beginPath();
		cxt.fillRect(this.x[i], this.y[i], this.square, this.square);
		cxt.closePath();
		cxt.fill();
	}
	cxt.restore();
	
	fruit.draw();
	
	
}

// 键盘、检测是否可以移动
function getCode() {
	window.onkeydown = function(e) {
		if (e.keyCode == 37 && snake.derect != 3) { //left
			snake.derect = code = 1;
		} else if (e.keyCode == 38 && snake.derect != 4) { //up
			snake.derect = code = 2;
		} else if (e.keyCode == 39 && snake.derect != 1) { //right
			snake.derect = code = 3;
		} else if (e.keyCode == 40 && snake.derect != 2) { //down
			snake.derect = code = 4;
		}
	}
}

//移动蛇
function moveSnake() {
	for ( var i=0; i<snake.len; i++) {
		snake.x[i-1] = snake.x[i];
		snake.y[i-1] = snake.y[i];
		if (code == 1) { //left
			
			snake.x[i] -= snake.square;
		} else if (code == 2) { //up
			snake.y[i] -= snake.square;

		} else if (code == 3) { //right
			snake.x[i] += snake.square;

		} else if (code == 4) { //down
			snake.y[i] += snake.square;

		}
		
	}
}

var fruitObj = function() {
	this.x;
	this.y;
}

//随机食物
fruitObj.prototype.born = function() {
	this.x = Math.floor(Math.random()*10) * canWidth*0.1; 
	this.y = Math.floor(Math.random()*10) * canHeight*0.1;
}

fruitObj.prototype.draw = function() {
	cxt.save();
	cxt.fillStyle = 'white';
	cxt.fillRect(this.x, this.y, snake.square, snake.square);
	cxt.fill();
	cxt.restore();
}

//碰撞检测
function boom() {
	var headx = snake.x[snake.len - 1],
		heady = snake.y[snake.len - 1];
		
	// 吃食物
	var l = calLength2(headx, heady, Math.floor(fruit.x), Math.floor(fruit.y))
	if ( l < 5) {
		fruit.born();
		snake.score += 10;
		snake.len += 1;
		
		return;
	}
	
	//撞墙
	if (headx < 0 || headx + 10 > canWidth || heady < 0 || heady + 10 > canHeight) {
		alert('awwwwwch!');
		game();
	}
	
	//撞自己
	for (var i=0; i<snake.len-1;i++){
		if (headx == snake.maps[i][0] && heady == snake.maps[i][1]) {
			alert('holy shit!');
		game();
		}
	}
}

//分数
function score() {
	var score = document.getElementById('score');
	score.innerHTML = 'score: </br>' + snake.score;
	score.style.textAlign = 'center';
}

function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}
