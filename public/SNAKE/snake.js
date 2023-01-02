
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake Head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5; 

//Volicity to make the snake move
var velocityX = 0;
var velocityY = 0;

//Snake body
var snakeBody = []; //The code is similar to the head but because we have multiple this time, I want to use an array.

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board


    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100miliseconds
}



//in here we pass an event(e) 
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0; 
        velocityY = -1; // In here we change the velocity
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0; 
        velocityY = 1; // In here we change the velocity
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1; 
        velocityY = 0; // In here we change the velocity
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1; 
        velocityY = 0; // In here we change the velocity
    }
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "black"; //This changes the color of the pen to black
    context.fillRect(0, 0, board.width, board.height); // We are starting from the corner of the page and we are filling with a width and height of 500(20*25)

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize); // ( x, y, width, height )

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]) //This grows the segment where the food was
        placeFood(); //We are calling on the place food function everytime we go over the food
    }

    for(let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]; //basically we are starting from the tail. Before we update the coordinates, we want the tail to get the previos X & Y coordinates so that they can move forward.
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]; //if there are body parts in the array; we are going to set snake body of 0 and we are going to set it to the head. 
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // ( x, y, width, height )
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize) //The snakebody is the X & Y coordinates
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY <0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }   
}

function placeFood() {
    //0-1 * cols -> (0,19.99999) -> (0,19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}
