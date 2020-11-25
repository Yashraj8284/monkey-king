var PLAY = 0;
var END = 1;
var gameState = PLAY;

var monkey, monkey_running, monkeyCollide, ground, invisibleGround, groundImg, banana, bananaImage, obstacle, obstacleImage;

var FoodGroup, obstacleGroup;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkeyCollide = loadAnimation("sprite_1.png");
  groundImage = loadAnimation("ground.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);

  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  monkey = createSprite(80, 230, 10, 10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);

  ground = createSprite(300, 340, 600, 10);
  ground.addAnimation("ground", groundImage);
  ground.scale = 1;
  
  invisibleGround = createSprite(300, 278, 600, 7);
  invisibleGround.visible = false;

  score = 0;
  bananaScore = 0;
  survivalScore = 0;
}

function draw() {
  background("lightblue");
  fill("black");
  textSize(13);
 
  textSize(20);
  text("survival Score :" + survivalScore,130,50);
  fill("black");
  textSize(13);

 if (gameState === PLAY) {
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate() / 60);
    survivalScore = survivalScore + Math.round(getFrameRate()/60);

    ground.velocityX = -(4 + score * 1.5 / 100);

 if (keyDown("space") && monkey.y >= 235) {
      monkey.velocityY = -17;
  }

   monkey.velocityY = monkey.velocityY + 0.8;

 if (ground.x < 0) {
      ground.x = ground.width / 2;
      console.log(ground.x)
  }

 if (monkey.isTouching(bananaGroup)) {
      bananaScore = bananaScore + 2;
      bananaGroup.destroyEach();
  }
    
 if (monkey.isTouching(obstacleGroup)) {
    gameState = END;
 }
   
 if (survivalScore > 549){
    gameState = END;
 }
   
 if(bananaScore > 29){
   
   fill("green");
   textSize(30);
   text("YOU WIN",60,170);
   fill("black");
   textSize(20);
   text("Press 'R' to play again...", 100, 200);

    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
   
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    survivalScore = 0;
    
  if (keyDown("r")) {
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0; 
      bananaScore = 0;
      survivalScore = 0;
      gameState = PLAY;  
 }
 } 
 } 
  
 if (gameState === END) {
    ground.velocityX = 0;

    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    fill("red");
    textSize(30);
    text("GAMEOVER", 120, 170);
    fill("black");
    textSize(20);
    text("Press 'R' to play again...", 100, 200);
    

  if (keyDown("r")) {
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0; 
      bananaScore = 0;
      survivalScore = 0;
      gameState = PLAY;  
   }
   }

  drawSprites();

  monkey.collide(invisibleGround);
}

function bananas() {
  if (frameCount % 100 === 0) {

    banana = createSprite(620, 120, 50, 50)
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4 + score * 1.5 / 100);
    banana.lifetime = 220;
    bananaGroup.add(banana);
  }
  }

function obstacles() {
  if (frameCount % 150 === 0) {

    obstacle = createSprite(620, 253, 50, 50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4 + score * 1.5 / 100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);

  }
  }