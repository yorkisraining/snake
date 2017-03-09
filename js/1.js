window.onload = function () {
    var c = document.getElementById("snake").getContext("2d");

    var SIZE = 8;
    var ROW = 50;
    var COL = 50;
    var SPEED = 130;

    var del = 1;
    var score = 0;

    var snake = {
        map: [],
        body: 5,
        x: 80,
        y: 80,
        direction: 1
    }

    var food = {
        x: 240,
        y: 240
    }

    function drawSnake() {
        c.beginPath();
        c.fillStyle = "red";
        c.fillRect(snake.x, snake.y, SIZE, SIZE);
    }

    function cleanDrawSnake(x, y) {
        c.clearRect(x, y, SIZE, SIZE);
    }

    function drawFood() {
        food.x = Math.floor(Math.random() * COL);
        food.y = Math.floor(Math.random() * ROW);
        c.beginPath();
        c.fillStyle = "gray";
        c.fillRect(food.x * SIZE, food.y * SIZE, SIZE, SIZE);
    }
    drawFood();
    var interval = setInterval(function () {
        switch (snake.direction){
            case 0:
                snake.y -= SIZE;
                break;
            case 1:
                snake.x += SIZE;
                break;
            case 2:
                snake.y += SIZE;
                break;
            case 3:
                snake.x -=SIZE;
                break;
            default:
                console.log("ERROR");
        }
        snake.map.push({x: snake.x, y: snake.y});
        // console.log(snake.map);
        if(snake.map.length > snake.body){
            del = snake.map.shift();
            // console.log(del);
            cleanDrawSnake(del.x, del.y);
        }
        drawSnake();

        if(snake.x == food.x * SIZE && snake.y == food.y * SIZE){
            drawFood();
            score++;
            document.getElementById("score").innerHTML = score;
            snake.body ++;
        }
    }, SPEED)
    
    document.addEventListener("keydown", function (e) {
        e = e || window.event;
        // console.dir(e.keyCode);
        switch (e.keyCode){
            case 37:
                snake.direction = 3;
                break;
            case 38:
                snake.direction = 0;
                break;
            case 39:
                snake.direction = 1;
                break;
            case 40:
                snake.direction = 2;
                break;
            default:
        }
    })
    console.dir(interval);
}