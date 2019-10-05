function player(brain) {
  this.sizey = 30
  this.sizex = 15
  this.vel = createVector(0, 0)
  this.pos = createVector(270, height - this.sizey - 5)
  this.box = new hitbox(this.pos.x, this.pos, this.sizex, this.sizey)
  if (brain) {
    this.brain = brain.copy()
  } else {
    this.brain = new NeuralNetwork(8, 4, 3)
  }
  let inputs = [null, null, null, null, null, null, null, null]
  this.score = 0
  this.fitness = 0

  this.draw = function () {
    stroke('#FF0000')
    strokeWeight(2)
    this.box.update(this.pos.x, this.pos.y, this.sizex, this.sizey)

    image(playerImage, this.pos.x, this.pos.y, this.sizex, this.sizey)
  //  for (var i = 0; i < this.box.lines.length; i++) {
  //      line(this.box.lines[i][0].x, this.box.lines[i][0].y,this.box.lines[i][1].x, this.box.lines[i][1].y)
    //}
  }

  this.update = function (i) {
    this.score++

    if (this.pos.x > 170 && this.pos.x < 340) {
      this.score++
    }
    this.pos.add(this.vel)
    this.vel = createVector(0, 0)

    if (this.rightT == 13 || this.leftT == 13) {
      oldCars.push(cars.splice(i, 1))
    }
  }

  this.collision = function (hitbox, j) {
    if (collision(this.box, hitbox)) {
      oldCars.push(cars.splice(j, 1))
    }
  }

  this.think = function () {

    inputs[0] = this.pos.x / width
    inputs[1] = this.pos.y / height

   let closest1 = null
   let closest2 = null
   let closest3 = null

   let currentCol = []
   let currentCol2 = []
   let currentCol3 = []

    for (var i = 0; i < enemies.length; i++) {

      if (this.pos.x == enemies[i].pos.x) {
        currentCol.push(enemies[i])
        closest1 = enemies[i]
      }

      if (this.pos.x + 20 == enemies[i].pos.x) {
        currentCol2.push(enemies[i])
        closest2 = enemies[i]
      }

      if (this.pos.x - 20 == enemies[i].pos.x) {
        currentCol3.push(enemies[i])
        closest3 = enemies[i]
      }
    }

    for (var i = 0; i < currentCol.length; i++) {
      if (closest1.pos.y < currentCol[i].pos.y) {
        closest1 = currentCol[i]
    }
    }

    for (var i = 0; i < currentCol2.length; i++) {
      if (closest2.pos.y < currentCol2[i].pos.y) {
        closest2 = currentCol2[i]
    }
    }

    for (var i = 0; i < currentCol3.length; i++) {
      if (closest3.pos.y < currentCol3[i].pos.y) {
        closest3 = currentCol3[i]
    }
    }

if (closest1 != null) {
  inputs[2] = abs(closest1.pos.x) / width
  inputs[3] = abs(closest1.pos.y) / height
}

if (closest2 != null) {
  inputs[4] = abs(closest2.pos.x) / width
  inputs[5] = abs(closest2.pos.y) / height
}

if (closest3 != null) {
  inputs[6] = abs(closest3.pos.x) / width
  inputs[7] = abs(closest3.pos.y) / height
}

    let outputs = this.brain.predict(inputs)
    let index = outputs.indexOf(Math.max.apply(Math, outputs))

    switch (index) {
      case 0:
        this.right()
        break;
        case 1:
          this.left()
          break;
      default:

    }
  }

  this.mutate = function() {
    this.brain.mutate(0.1)
  }

  this.left = function () {
    if ( this.pos.x > 150) {
      this.vel.x = -(this.sizex + 5)
    }
  }

  this.right = function () {
    if (this.pos.x < 390) {
      this.vel.x = (this.sizex + 5)
    }
  }

  this.up = function () {
    if (this.pos.y < height) {
      this.vel.y = -(this.sizex + 5)
    }
  }

  this.down = function () {
    if (this.pos.y > 0) {
      this.vel.y = (this.sizex + 5)
    }
  }

}
