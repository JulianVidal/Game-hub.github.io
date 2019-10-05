let snake

let foods = []

let foodrate = 15

function setup() {
  createCanvas(500, 500)

  snake = new player()

  foods.push(new food())

  frameRate(7)
}

function draw() {
  background(0)

  for (var i = 0; i < foods.length; i++) {
    foods[i].draw()
  }

  snake.think()
  snake.draw()
  snake.update()
  for (var i = 0; i < foods.length; i++) {
    snake.collision(foods[i], i)
  }
  snake.itself()

}
