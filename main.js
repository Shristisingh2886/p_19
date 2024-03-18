var balloon
var balloon_flying
var PLAY = 1
var END = 0
var game_state = PLAY
var balloon_collided

function preload(){
    
    balloon_flying = loadImage("balloon.png")
    bg = loadImage("bg.jpg")
    arrowImg = loadImage("arrow.png")
    restart1 = loadImage("restart.png")
    gameOver1 = loadImage("gameOver.png")
  }


  function setup() {
    createCanvas(600, 600);
    back = createSprite(300,300);
    back.addImage("sky",bg);
    back.velocityY = 1;
    back.scale = 2
    back.depth = -3
    balloon =  createSprite(300,530);
    balloon.addImage("flying", balloon_flying)
    balloon.scale = 0.13
   
  
   block_group = new Group()

   restart = createSprite(300,300)
   restart.addImage(restart1)

   gameOver= createSprite(300,250)
   gameOver.addImage(gameOver1)
  }
  function arrows(){
    if(frameCount%100 == 0){
      arrow_ = createSprite(100,-50)
      arrow_.x=Math.round(random(150,450))
      arrow_.addImage("arrow", arrowImg);
      arrow_.velocityY=3
      arrow_.scale = 0.3
      block_group.add(arrow_)
      arrow_.lifetime = 650
      arrow_.depth = balloon.depth
      balloon.depth = balloon.depth+1
  
    }
  }
score = 0;
high_score = 0;

function draw() {
    background(200)
    text("score : " + score, 520,30)
    text("HS : " + high_score,450 ,30)
    if(game_state == PLAY){
      
      restart.visible = false;
      gameOver.visible = false;
      back.velocityY = 1
      score= score+Math.round(getFrameRate()/60)
      console.log(score)
      if(back.y > 400){
        back.y = 300
      }
      if(balloon.isTouching(block_group)){
        game_state = END
        console.log(game_state)
        console.log(score)
      }
      if(keyDown(LEFT_ARROW)){
        balloon.x=balloon.x - 5;
        
      }
      if(keyDown(RIGHT_ARROW)){
        balloon.x=balloon.x + 5;
       
      }
  
    }
    else if(game_state == END){
    
      restart.visible = true;
      gameOver.visible = true;
      back.velocityY = 0
      
      block_group.setVelocityYEach(0)
      block_group.setLifetimeEach(-1)
      
      if(high_score < score){
        high_score = score
      }
      if(mousePressedOver(restart)){
        reset();
      }
     }
   
    
    arrows()
      drawSprites()
  }
  function reset(){
    game_state = PLAY
    restart.visible = false
    gameOver.visible = false
    block_group.destroyEach()
    score = 0;
  }
  