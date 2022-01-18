var back,backImg;
var char,charImg;
var bullet; 
var score =0;
var PLAY = 1;
var END = 0;
var gameState = PLAY

var enemy,enemyImg,enemyG;


function preload(){
  backImg = loadImage("img/bg.png");
  charImg = loadAnimation("img/ch3.png","img/ch4.png")
  charImg.frameDelay = 10

  ch_slide = loadAnimation("img/ch,slide.png");
  enemyImg = loadAnimation("img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png","img/10.png","img/11.png","img/12.png")
  enemyImg.frameDelay = 10
}
function setup(){
  createCanvas(displayWidth, displayHeight)

  back = createSprite(200,200);
  back.addImage("back",backImg);

  char = createSprite(80,350);
  char.addAnimation("runing",charImg);
  char.addAnimation("slide",ch_slide)

  char.scale = 2

  enemyG = new Group();

}

function draw(){
  background(0);

  if (gameState === PLAY) {
    gamePLAY()
  }
  if (gameState === END) {
    gameEND() 
  }
  if (score === 100){
    gameState = "end";
  }
  
  if(enemyG.isTouching(bullet)){
    enemyIsTouchingBullet()
   }
  
  
  if(back.x <0){
    back.x = back.width/2
  }
  enemies();
  drawSprites();

  if(enemyG.isTouching(char)){
    gameEND()
    fill ("red")
    text("you died",1114,230)
    textSize(30)
    text("press ctrl r to rest",1114,300)
   }
  fill("white")
  textSize(20)
  textSize(20)
  text("Score: " + score, 500, 50);
 


 
 }
 function gameEND(){
  enemyG.setVelocityXEach(0)
  back.velocityX = 0
    char.changeAnimation("slide",ch_slide)
    
    textSize(40)
    

    if (keyDown("r") && gameState === "end") {
      gameState = "play";
      Score = 0;
    }
 }

 function gamePLAY(){
  if(keyDown("w")){
    bullet = createSprite(116,365,5,5)
    bullet.velocityX = 9

    
  }
  if(keyDown("d")){
    back.velocityX = -6
    enemyG.setVelocityXEach(-12)
    char.changeAnimation("runing",charImg);
  }
  if(keyDown("a")){
    back.velocityX = +4
    enemyG.setVelocityXEach(-0.3)
    bullet.velocityX = 10
    char.changeAnimation("runing",charImg);
  }
  if(keyDown("s")){
    char.changeAnimation("slide",ch_slide);
    enemyG.setVelocityXEach(-19)
    back.velocityX = -9

  }
 }

 function enemyIsTouchingBullet(){
  score = score + Math.round(frameCount / 60);  
  
  for(var i=0;i<enemyG.length;i++){     
    if(enemyG[i].isTouching(bullet)){
     enemyG[i].destroy()
         }
   }
}

function enemies(){
  if(frameCount % 40===0){
    enemy = createSprite(displayWidth,350)
    enemy.addAnimation("enemy",enemyImg)
    enemy.scale = 1.5
    enemy.velocityX = -9
    enemyG.add(enemy)

  }
}

 
  
