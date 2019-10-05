let cars = []
let frames = 45
let rate = 45
let frog
let forward
let backward
let right
let left

function setup() {

  createCanvas(348, 500)
  frog = new player()
}

function draw() {
  background(0)

  if (frameCount == frames) {
    cars.push(new car())
    frames += rate
  }

  frog.draw()

  for (let i = cars.length; i > 0 ; i--) {
        cars[i - 1].draw()
        cars[i - 1].update()
  }

}

function keyTyped() {
  frog.move()
}
