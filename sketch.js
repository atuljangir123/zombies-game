var player,player_image,playerbig_gun_image
var ZomGroup,zom_1,zom_2,zom_3,ZomGroup1,ZomGroup2
var back,back_image
var life,GunshotGroup,gun_shot_image
var sound_zom,sound_gunshot,big_shot_image,BigGroup,deadSound
var zombie_sound
var score
var PLAY = 1,END = 0;
var START = 2;
var gameState = START;
var invisible_side,invisible_side1,gameOver_image,gameOver,restart_image,restart
var intro_image,intro
function preload(){
  
  back_fg = loadImage("road.png");
  player_image = loadImage("gun - Copy.png");
  playerbig_gun_image = loadImage("big gun.png");
 
  //zom_image = loadAnimation("
  
  gun_shot_image = loadImage("shotgun.png");
  big_shot_image = loadImage("big shot.png");
  sound_gunshot = loadSound("gun shot.mp3");
zom_1 = loadImage("zom11.png");
  zom_2 = loadImage("zom22.png");
  sound_zom = loadSound("Evil Yelling-SoundBible.com-1774362373.wav");
  zom_3 = loadImage("zom33.png");
 
  gameOver_image = loadImage("game over.jpg");
  restart_image = loadImage("re.png");
  deadSound = loadSound("Retro-game-over-sound-effect.mp3");
 
  
  intro_image = loadImage("intro.png");
       
}








function setup(){
  createCanvas(600, 600);
  back =  createSprite(300,300,600,600);
  
    back.addImage(back_fg);
   back.velocityY = 5;
  back.scale = 1.5;
  
  
  player = createSprite(250,450,20,20);
  player.addImage("gun-Copy", player_image);
  player.addImage("big gun", playerbig_gun_image);
  player.scale = 0.3;
  //player.visible = false;
  
 
  
  invisible_side = createSprite(155,300,50,600);
  invisible_side.visible = false;
  
  invisible_side1 = createSprite(420,450,50,600);
  invisible_side1.visible = false;
  
  score = 0;
  gameOver = createSprite(300,285,20,20);
 gameOver.addImage(gameOver_image);
  gameOver.visible = false;
  
  restart = createSprite(300,500,20,20);
 restart.addImage(restart_image);
  restart.scale = 0.3;
  restart.visible = false;
  
  
  
  intro = createSprite(300,285,20,20);
  intro .addImage("intro",intro_image);

  intro.scale = 0.5;
  intro.visible = true;

  GunshotGroup = new Group();
 ZomGroup = new Group();
  ZomGroup1 = new Group();
  ZomGroup2 = new Group();
  
  ZomGroup.visible =false;
  ZomGroup1.visible = false;
  ZomGroup2.visible = false;
  
}

function draw() {
  background(0);
  
  if(gameState === START){
    
  back.visible = false;
  player.visible = false;
  
  if(keyDown("space")){
    gameState = PLAY;
    //intro.visible = false;
  }
  
  }
  if(gameState === PLAY){
  intro.visible = false;
  back.visible = true;
  if(back.y>=400){
    back.y = 300;
  }
    player.visible = true;
   player.velocityX = 0;
  
  if(GunshotGroup.collide(ZomGroup)){
    sound_zom.play();
    GunshotGroup.destroyEach();
   ZomGroup.destroyEach();
    score = score+ 1;
  }
  
  
  if(GunshotGroup.collide(ZomGroup1)){
    sound_zom.play();
    GunshotGroup.destroyEach();
   ZomGroup1.destroyEach();
    score = score+1;
  }
  
  if(GunshotGroup.collide(ZomGroup2)){
    sound_zom.play();
    GunshotGroup.destroyEach();
   ZomGroup2.destroyEach();
    score = score+1;
  }
    
  
  //key_right
  if(keyDown("right")){
    player.velocityX = 5;
    
  }
 
  //key_left
   if(keyDown("left")){
    player.velocityX = -5;
    
  }
  

  //change animation when key c pressed
  if(keyDown("c")){
    player.changeImage("big gun", playerbig_gun_image);
    player.scale= 0.4;
   
  }
  if(keyDown("t")){
    player.changeImage("gun-Copy", player_image);
    player.scale = 0.3;
    
  }
  
 
  
  if(score >=10){
    back.velocityY = 15;
    
  }
  
 if(ZomGroup.collide(player)||ZomGroup1.collide(player)||ZomGroup2.collide(player)){
   gameState = END;
  
  }
  //collide player with side road
  player.collide(invisible_side);
  player.collide(invisible_side1);
  
  
  spawnGunshot();
  spawnZom1();
  spawnZom2();
  spawnZom3();
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    back.velocityX = 0;
    
    ZomGroup.setVelocityXEach(0);
    ZomGroup1.setVelocityXEach(0);
     ZomGroup2.setVelocityXEach(0);
    
    
    //change the trex animation
    
    player.visible =false;
    
    ZomGroup.destroyEach();
     ZomGroup1.destroyEach();
     ZomGroup2.destroyEach();
    back.visible = false;
    
    if(keyDown("r")&& gameState === END){
      reset();
    }
    
  }
  
drawSprites();
 
  
   
  
   textSize(34);
  fill("green");
  text("LIVE: "+score,16,30);
  
  

}
//gunshot
function spawnGunshot(){
  
  if(keyDown("up_arrow")){
    
    var shot=createSprite(player.x+10,player.y-35,10,10);
    shot.addImage(gun_shot_image);
    shot.scale = 0.05;
    shot.velocityY=-10;
     sound_gunshot.play();
   shot.lifetime=150;
    GunshotGroup.add(shot);
  
    
  }
}





//zom_1
 function spawnZom1(){
   if(frameCount %80==0){
    
   var zom = createSprite(300,0,20,30);
   zom.x = Math.round(random(225,400));
   zom.addImage(zom_1);
  zom.scale = 0.2;
   zom.velocityY = 5;
   zom.lifetime = 160;
  
   ZomGroup.add(zom);
  
 }
 }
function spawnZom2(){
  if(frameCount%80==0){
    
   var zom1 = createSprite(400,0,20,30);
   zom1.x = Math.round(random(400,200));
   zom1.addImage(zom_2);
  zom1.scale = 0.2;
   zom1.velocityY = 5;
   zom1.lifetime = 160;
  
   ZomGroup1.add(zom1);
  
 }
  if(score >=25 && frameCount%90==0){
    back.velocityY = 29;
 
    
   var zom2 = createSprite(400,0,20,30);
   zom2.x = Math.round(random(400,200));
   zom2.addImage(zom_2);
  zom2.scale = 0.2;
   zom2.velocityY = 10;
   zom2.lifetime = 160;
  
   ZomGroup.add(zom2);
  
 }
  }

function spawnZom3(){
     if(score >=25 && frameCount%80==0){
    back.velocityY = 29;
 
    
   var zom2 = createSprite(300,0,20,30);
   zom2.x = Math.round(random(400,200));
   zom2.addImage(zom_3);
  zom2.scale = 0.2;
   zom2.velocityY = 10;
   zom2.lifetime = 160;
  
   ZomGroup2.add(zom2);
  
 }
 
}

 function reset(){
   gameState = PLAY;
  gameOver.visible = false;
   restart.visible = false;
  
   ZomGroup.destroyEach();
   ZomGroup1.destroyEach();
   ZomGroup2.destroyEach();
   
  player.visible = true;
   back.visible = true;
  
 
 
 

   score = 0;
  
 }


