let car
let enemies = []

let counter = 0
let enemyRate = 5

let playerImage

let enemyImage

let grassImage

let grassVel = 5

let grassBottom = 0

let grassTop = 0

function preload() {
playerImage = loadImage('sprite/player.png')

enemyImage = loadImage('sprite/enemy.png')

grassImage = loadImage('sprite/grass.png')
}

function setup() {
createCanvas(560, 600)

enemies.push(new enemy())

car = new player()

grassTop = -height
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

counter ++
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

if (counter == enemyRate) {
  enemies.push(new enemy())
  enemyRate += 5
}

for (var i = enemies.length; i > 0; i--) {
  enemies[enemies.length - 1].overlap((i - 1))
  enemies[i - 1].draw()
  enemies[i - 1].update((i - 1))
  if (car.pos.x == enemies[i - 1].pos.x) {
    car.collision(enemies[i - 1].box)
  }
}

car.draw()
car.update()

}

function keyPressed() {
if (keyCode == LEFT_ARROW) {
  car.left()
}
if (keyCode == RIGHT_ARROW) {
  car.right()
}
if (keyCode == UP_ARROW) {
  car.up()
}
if (keyCode == DOWN_ARROW) {
  car.down()
}
}
