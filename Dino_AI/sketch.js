let walls = []
let clouds = []
let birds = []
let dinos = []
let oldDinos = []

const totalPopulation = 250
let framesWall = 30
let rateWall = 60

let framesCloud = 30
let rateCloud = 120

let framesBird = framesWall + 25

let spriteDinoImage
let spriteDinoData
let animationDino = []

let spriteCactusImage

let spriteCloudImage

let spriteSandImage
let spriteSand2Image
let spriteSandpos
let spriteSandvel = 3

let spritebirdImage

let iterate = 10

let counter = 0

let slider

let highscore = 0

let generation = 0

let greatestScore = 0

function preload() {


  spriteDinoImage = loadImage('sprite/dino.png')

  spriteDinoData = loadJSON('sprite/dino.json')


  spriteCactusImage = loadImage('sprite/cactus.png')


  spriteCloudImage = loadImage('sprite/cloud.png')


  spriteSandImage = loadImage('sprite/sand.png')

  spriteSand2Image = loadImage('sprite/sand.png')

  spriteBirdImage = loadImage('sprite/bird.png')

}

function setup() {

  slider = createSlider(1, 100, 1, )

  spriteSandposx = 0
  spriteSand2posx = 700

  imageMode(CENTER)
  rectMode(CENTER)

  createCanvas(700,400)

  for (var i = 0; i < totalPopulation; i++) {
    dinos.push(new player())
  }

 let spriteDinoFrames = spriteDinoData.frames

  for (let i = 0; i < spriteDinoFrames.length; i++) {
    let pos = spriteDinoFrames[i].position
    let img = spriteDinoImage.get(pos.x, pos.y, pos.w, pos.h)
    animationDino.push(img)
  }

}

function draw() {

  background(200)

  rectMode(CORNER)
  imageMode(CORNER)
  fill('#7777FF')
  rect(0, 0,  width , height/2 - 13)
  image(spriteSandImage, spriteSandposx, height/2 - 13, width, height - (height/2 - 13))
  image(spriteSand2Image, spriteSand2posx, height/2 - 13, width, height - (height/2 - 13))

    spriteSand2posx -= 5 + counter/1000

    spriteSandposx -= 5 + counter/1000

  if (spriteSandposx < -width) {
    spriteSandposx = spriteSand2posx + 700
  }

  if (spriteSand2posx < -width) {
    spriteSand2posx = spriteSandposx + 700
  }

  rectMode(CENTER)
  imageMode(CENTER)

for (var l = 0; l < slider.value(); l++) {
  if (counter == framesWall){
      walls.push(new wall())
      framesWall += rateWall
    }

  if (counter == framesCloud) {
    clouds.push(new cloud())
    clouds[clouds.length - 1].setup()
    framesCloud += rateCloud
  }

  if (counter == framesBird) {
    if (Math.random() < 0.3){
    birds.push(new bird())
    framesBird += rateWall

  }
  }


  for (let i = walls.length; i > 0; i--) {

    walls[i - 1].update()
    walls[i - 1].remove(i - 1)
    for (var j = 0; j < dinos.length; j++) {
      if (walls[i - 1] != undefined){
      walls[i - 1].collision(dinos[j], j)
      }
    }
  }

  for (let i = clouds.length; i > 0; i--) {

    clouds[i - 1].update()
    clouds[i - 1].remove(i - 1)
  }

  for (let i = birds.length; i > 0; i--) {

    birds[i - 1].update()
    birds[i - 1].remove(i - 1)
    for (var j = 0; j < dinos.length; j++) {
      if (birds[i - 1] != undefined){
      birds[i - 1].collision(dinos[j], j)
    }
    }
  }

for (var i = 0; i < dinos.length; i++){

  if (dinos[i].pos.y < 166) {
  dinos[i].draw()
} else {
  image(animationDino[0], dinos[i].pos.x + 1, 167, 48, 48)
}

  dinos[i].think(walls, birds)
  dinos[i].update()
  dinos[i].fall()
  dinos[i].up()
}

  if (dinos.length == 0) {
    nextGeneration()
  }

  counter++
 }

 for (var i = clouds.length; i > 0 ; i--) {
     clouds[i - 1].draw()
 }

 for (let i = walls.length; i > 0; i--) {
   walls[i - 1].draw()
 }

 for (let i = birds.length; i > 0 ; i--) {
   birds[i - 1].draw()
 }



 for (var i = 0; i < dinos.length; i++) {
   if (dinos[i].pos.y < 166) {
   dinos[i].draw()
 } else {
   image(animationDino[0], dinos[i].pos.x + 1, 167, 48, 48)
 }
 }


  for (var i = 0; i < dinos.length; i++) {
    if(dinos[i].score > highscore) {
      highscore = dinos[i].score
    }
    if(dinos[i].score > greatestScore) {
      greatestScore = dinos[i].score
    }
  }

textSize(18)
fill(0)
noStroke()
text('Score:', 15, 25)
text(highscore, 75, 25)
text('Generation:', 15, 50)
text(generation, 115, 51)
text('Greatest Score:', 15, 75)
text(greatestScore, 150, 76)

}

function gameOver(c) {
  oldDinos.push(dinos.splice(c, 1)[0])
  oldDinos = oldDinos.filter(element => element != undefined)
}
