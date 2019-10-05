let cars = []
let enemies = []

let oldCars = []

let population = 500

let counter = 0
let enemyRate = 1

let playerImage

let enemyImage

let grassImage

let grassVel = 5

let grassBottom = 0

let grassTop = 0

let slider

let generation = 0

let bestScore = 0

function preload() {
playerImage = loadImage('sprite/player.png')

enemyImage = loadImage('sprite/enemy.png')

grassImage = loadImage('sprite/grass.png')
}

function setup() {
createCanvas(560, 600)

for (var i = 0; i < population; i++) {
  cars.push(new player())
}

grassTop = -height

slider = createSlider(1, 100, 1, 1)
}

function draw() {
  if (grassTop >= height) {
    grassTop = -height + grassVel
  } else {
    grassTop += grassVel
  }

if (grassBottom >= height) {
  grassBottom = -height + grassVel
} else {
  grassBottom += grassVel
}


noStroke()
background(0)
fill(100)
rect(width/4, 0, width/2 + 10, height)
fill('#33FF77')
image(grassImage, 0, grassTop, width/4, height)
image(grassImage, 0, grassBottom, width/4, height)
image(grassImage, width - width/4 - 5, grassTop, width/4 + 5, height)
image(grassImage, width - width/4 - 5, grassBottom, width/4 + 5, height)
fill(200)
for (var i = 0; i < 14; i++) {
  if (i == 0) {
    rect(140, 0, 6, height)
  } else if (i == 13) {
    rect(408, 0, 7, height)
  }
  rect(146 + i * 20, 0, 2, height)
}

for (var l = 0; l < slider.value(); l++) {

counter ++

if (counter == enemyRate) {
  enemies.push(new enemy())

  enemyRate += 5
}

for (var i = enemies.length; i > 0; i--) {
  enemies[enemies.length - 1].overlap((i - 1))
  enemies[i - 1].update((i - 1))
  for (var j = 0; j < cars.length; j++) {
    if (cars[j].pos.x == enemies[i - 1].pos.x) {
      cars[j].collision(enemies[i - 1].box, j)
    }
  }
}

if (cars.length == 0) {
  nextGeneration()
}

for (var i = 0; i < cars.length; i++) {
  cars[i].think()
  cars[i].update(i)
}
}

for (var i = enemies.length; i > 0; i--) {
  enemies[i - 1].draw()
}

for (var i = 0; i < cars.length; i++) {
  cars[i].draw()
}

  for (var i = 0; i < cars.length; i++) {
    if (cars[i].score > bestScore) {
      bestScore = cars[i].score
    }
  }


stroke(0)
textSize(24)
fill(255)
text(generation, 5, 24)
text(bestScore, 5, 48)

}
