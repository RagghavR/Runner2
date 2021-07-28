var path,boy,cash,diamonds,jwellery,sword,over;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,overImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;


var gamestate = "start";

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  overImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
over = createSprite(200,300,10,10)
over.addImage(overImg)
over.scale = 0.75
over.visible = false
}

function draw() {

  if(gamestate === "start"){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+ 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+ 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gamestate = "end"
    }
  }
  }
  if (gamestate === "end"){
    path.velocityY = 0
    diamondsG.setVelocityYEach (0)
    cashG.setVelocityYEach (0)
    jwelleryG.setVelocityYEach (0)
    swordGroup.setVelocityYEach (0)
    diamondsG.setLifetimeEach (-1)
    cashG.setLifetimeEach (-1)
    jwelleryG.setLifetimeEach (-1)
    swordGroup.setLifetimeEach (-1)
    gameover();
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30)
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 220;
  cashG.add(cash);
  cash.debug
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 220;
  diamondsG.add(diamonds);
  diamonds.debug
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 220;
  jwelleryG.add(jwellery);
  jwellery.debug
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 220;
  swordGroup.add(sword);
  sword.debug
  }
}

function gameover(){
  over.visible = true
}