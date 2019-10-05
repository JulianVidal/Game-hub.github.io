let cars = []
let trees = []
let framesCar = 1
let rateCar = 10
let framesTree = 1
let rateTree = 3
let frog
let forward
let backward
let right
let left
let counter = 0

let frogImage

let truckImage
let greenCarImage
let blueCarImage

let treeImage
let treeData
let treeParts = []

function preload() {

frogImage = loadImage('sprite/frog.png')

truckImage = loadImage('sprite/truck.png')
greenCarImage = loadImage('sprite/greenCar.png')
blueCarImage = loadImage('sprite/blueCar.png')

treeData = loadJSON('sprite/tree.json')
treeImage = loadImage('sprite/tree.png')
}

function setup() {

  let frames = treeData.frames

  for (var i = 0; i < frames.length; i++) {
    let pos = frames[i].position
    let img = treeImage.get(pos.x, pos.y, pos.w, pos.h)
    treeParts.push(img)
  }

  createCanvas(450, 645)

  frog = new player()
}

function draw() {
  background(0)

  fill('#77F')
  noStroke()
  rect(0, 0, width, height / 2 + 7.5)

  fill('#7F7')
  noStroke()
  rect(0, height / 2 + 7.5, width, height / 2)

  if (counter == framesCar) {
    cars.push(new car())
    framesCar += rateCar
  }

  if (counter == framesTree) {
    trees.push(new tree())
    framesTree += rateTree
  }



  for (let i = cars.length; i > 0 ; i--) {
        cars[i - 1].draw()
        cars[i - 1].update()
        cars[i - 1].collision(frog)
        cars[0].overlap()
  }

  for (var i = trees.length; i > 0; i--) {
    trees[i - 1].draw()
    trees[i - 1].update()
    trees[0].overlap()
  }

  frog.draw()
  frog.update()
  frog.boundaries()

  counter++

}

function keyPressed() {
  frog.move()
}
