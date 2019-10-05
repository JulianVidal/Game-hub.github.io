function player(brain) {
  this.size = 10
  this.speed = this.size
  this.pos = createVector(width/2, height/2)
  this.vel = createVector(0, -this.speed)
  this.tail = []
  if (brain) {
    this.brain = brain
  } else {
    this.brain = new NeuralNetwork(5, 4, 4)
  }


  this.draw = function () {
    noStroke()
    fill(255)
    rect(this.pos.x, this.pos.y, this.size, this.size)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.size, this.size)
    }
    this.tail.splice(0, 1)
    this.tail.push(
      {
        x : this.pos.x,

        y : this.pos.y
      }
    )
  }

  this.update = function () {
    if (this.pos.x >= 0 && this.pos.x < width - this.size && this.pos.y >= 0 && this.pos.y <= height - this.size) {
      this.pos.add(this.vel)
    } else {
      noLoop()
    }
  }

  this.collision = function (object, i) {
    if (dist(this.pos.x, this.pos.y, object.pos.x, object.pos.y) <= 0) {
      this.tail.push(
        {
          x : this.pos.x,

          y :  this.pos.y
          }
      )
      object.remove(i)
      foods.push(new food())
    }

  }

  this.itself = function () {
    for (var i = 0; i < this.tail.length - 1; i++) {
      if (dist(this.pos.x, this.pos.y, this.tail[i].x, this.tail[i].y) <= 0)  {
        noLoop()
      }
    }
  }

  this.think = function () {
    let inputs = []

    inputs[0] = this.pos.x / width
    inputs[1] = this.pos.y / height
    inputs[2] = foods[0].pos.x / width
    inputs[3] = foods[0].pos.y / height
    inputs[4] = this.tail.length / 10

    let outputs = this.brain.predict(inputs)
    let index = outputs.indexOf(Math.max.apply(Math, outputs))
    switch (index) {
      case 0:
        this.up()
        break;
      case 1:
        this.down()
        break;
      case 2:
        this.left()
        break;
      case 3:
        this.right()
        break;
      default:
      console.log("what")
    }
  }

  this.up = function () {
    this.vel = createVector(0, -this.speed)
  }

  this.down = function () {
    this.vel = createVector(0, this.speed)
  }

  this.left = function () {
    this.vel = createVector(-this.speed, 0)
  }

  this.right = function () {
    this.vel = createVector(this.speed, 0)
  }

}
