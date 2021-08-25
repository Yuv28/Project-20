var ninja;
var enemyImg;
var enemyGroup;
var ground;
var groundImg;
var ninjaRunning;
var ninjaAttack;
var gameState = "play";
var invisPlatform;
var score = 0;
function preload(){
    ninjaRunning = loadImage("output-onlinepngtools.png");
    ninjaAttack = loadImage("output-onlinepngtools (1).png");
    groundImg = loadImage("Screen Shot 2021-08-18 at 11.43.52 AM.png")
    enemyImg = loadImage("output-onlinepngtools (2).png");
}

function setup() {
createCanvas(600,300);
ground = createSprite(300,180,600,20);
ground.addImage("ground",groundImg);
ground.x = ground.width/2;
ninja = createSprite(50,290,20,50);
ninja.addImage("running",ninjaRunning);
ninja.addImage("attacking",ninjaAttack);
ninja.scale = 0.5;
invisPlatform = createSprite(200,290,400,10);
invisPlatform.visible = false;
enemyGroup = createGroup();
}

function draw() {
 background(180);
 
 if(gameState === "play") {
     ground.velocityX = -(5 + 5 * score/20);
     if(ground.x < 220) {
        ground.x = ground.width/2;
    }

     spawnEnemies();
     ninja.collide(invisPlatform);
     if(enemyGroup.isTouching(ninja)) {
         ninja.destroy();
         enemyGroup.destroyEach();
         ground.destroy();
         gameState = "end";
     }
    if(keyDown("space")) {
        ninja.changeImage("attacking",ninjaAttack);
        score +=5;
        enemyGroup.destroyEach();
        
    }
    
    drawSprites();
    text("Score: " + score, 500, 50);
 text("Press Space to Attack!",300,50);
 }
 else if (gameState === "end") {
    text("GAME OVER",300,100);
 }
}
function spawnEnemies() {
    if(frameCount % 60 === 0) {
        var enemy = createSprite(600,265,50,70);
        enemy.addImage(enemyImg);
        enemy.velocityX = -(5 + score/5);
        enemy.scale= 0.5;
        enemy.lifetime = 300;
        enemyGroup.add(enemy);
    }
}