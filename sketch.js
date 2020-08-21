//Create variables here
var  dog, happyDog, database, foodS, foodStock
var lastFed,fedTime
var feedDog,addfoods;
var foodObj
function preload()
{
  //load images here
normalDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(200,300,10,10);
  dog.addImage(normalDog);
  dog.scale = 0.5;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  food1 = new Food(15,hour());
    

  feed = createButton("Feed the Dog");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addfood = createButton("add Food");
  addfood.position(450,95);
  addfood.mousePressed(addfoods);
  
  
}


function draw() {  
  background(46, 139, 87);
  fill(255,255,254);
  textSize(15);
  fedTime= database.ref('feedtime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  if(lastFed>=5){
    text("last Feed :"+lastFed+"PM",350,30)
  }else if(lastFed==0){
text("last Feed:12 AM",350,30);
  }else{
    text("last Feed:"+lastFed+"AM",350,30)
  }
  
  textSize(20);
  text("number of food:"+foodS,200,100);

console.log(hour())
  

  drawSprites();
  //add styles here
food1.display();
}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })

  
}
function addfoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(happyDog);
  foodS = foodS-1;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodS,
 feedtime:hour()
 

  })

  
}

