var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_stop
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0;

function preload() {

  monkey_stop = loadImage("sprite_0.png");

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 200);

  monkey_Stop = createSprite(640, 162, 1, 1);
  monkey_Stop.addImage("MS", monkey_stop);
  monkey_Stop.scale = 0.1;

  monkey = createSprite(257, 162, 1, 1);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300, 195, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  banana = createSprite(345, 67, 1, 1);
  banana.addImage("Banana", bananaImage);
  banana.scale = 0.04;

  obstacle = createSprite(640, 174, 1, 1);
  obstacle.addImage("Obstacle", obstacleImage);
  obstacle.scale = 0.1;

  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = false;

  score = 0;

}

function draw() {
  background(300);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (gameState === PLAY) {

    monkey.x = 257;
    
    monkey_Stop.x = 640;
    
    stroke("black");
  textSize(20);
  fill("black");
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  text("Survival Time: " + survivalTime, 4, 19)
    
    jump();

    B();

    points();

    spawnObstacles();

    if (monkey.isTouching(obstacle)) {
      gameState = END;
    }

  }

  if (gameState === END) {

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);

    monkey.x = 640;

    monkey_Stop.x = 257;

    text("Game Over, click R to restart!", 218, 100);

    if (keyDown("R")) {

      gameState = PLAY;

      score = 0;
      
      survivalTime = 0;
    
    }

  }


  drawSprites();
}

function jump() {

  //jump when the space key is pressed 
  if (keyDown("space") && monkey.y >= 150) {
    monkey.velocityY = -12;

  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

}

function points() {

  stroke("white");
  textSize(20);
  fill("red");
  text("Score: " + score, 502, 19)

  if (monkey.isTouching(banana)) {

    score = score + 1;

    banana.x = 603;

  }

}

function spawnObstacles() {

  obstacle.velocityX = -12;

  if (obstacle.x < -10) {

    obstacle.x = 610;

  }

}

function B() {

  banana.velocityX = -10;

  if (banana.x < -3) {

    banana.x = 603;

    banana.y = Math.round(random(100, 120));

  }

}