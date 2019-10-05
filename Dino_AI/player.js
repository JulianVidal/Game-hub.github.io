function player(brain) {
  this.pos = createVector(width/4, height/2 - 35)
  this.grv = 2
  this.force = 0
  this.forceAc = 0
  this.sizex = 43
  this.sizey = 40
  this.jumpHeight = 20
  this.y = 35
  this.index = 0
  this.animationSpeed = 0.1
  this.score = 0
  this.fitness = 0
  input = [null, null, null, null, null, null, null, null, null]

  if (brain) {
    this.brain = brain.copy()
  } else {
    this.brain = new NeuralNetwork(9, 6, 3)
  }

  this.mutate = function () {
    this.brain.mutate(0.1)
  }

  this.jump = function () {
    if (this.forceAc == 0 && this.force == 0) {
    this.force = 3
    this.forceAc = 1
    }
}

this.think = function (array1, array2) {

  let closestWall = null
  let closestWallD = Infinity
  let closestWall2 = null

//Closest wall
  for (var i = 0; i < array1.length; i++) {
    let newWallD = array1[i].pos.x - this.pos.x
    if (newWallD < closestWallD && newWallD > 0) {
      closestWallD = newWallD
      closestWall = array1[i]
      if (array1[i + 1]) {
        closestWall2 = array1[i + 1]
      }
    }
  }

  let closestBird = null
  let closestBirdD = Infinity


//Closest bird
  for (var i = 0; i < array2.length; i++) {
    let newBirdD = array2[i].pos.x - this.pos.x
    if (newBirdD < closestBirdD) {
      closestBirdD = newBirdD
      closestBird = array2[i]
    }
  }

if (closestWall != null ){
  //Postion of Dinosaur
  input[0] = this.pos.y / height

  //Center position of the closest wall
  input[1] = closestWall.pos.x / width
  input[2] = closestWall.pos.y / height

  //Center position of the closest Bird
  input[3] = null
  input[4] = null

  //Velocity of closest wall
  input[5] = closestWall.vel / 10

  //Velocity of closest Bird
  input[6] = null

  //Distance between the closest wall and the second closest walkl if any
  if (closestWall2 != null) {
    input[8] = (closestWall2.pos.x - closestWall.pos.x) / 1000
  } else {
    input[8] = null
  }
}

if (closestBird != null) {
  input[3] = closestBird.pos.x / width
  input[4] = closestBird.pos.y / height
  input[6] = closestBird.vel / 10
}

  let output = this.brain.predict(input)
  if (output[0] > 0.5) {
    this.jump()
  }
}

this.up = function () {
  this.force += this.forceAc
  this.pos.y -= this.force
}


  this.fall = function () {

    if (this.pos.y < height/2 - this.jumpHeight - 35) {
      this.forceAc = -.45
    }

    if (this.pos.y > (height/2 - this.y) && this.forceAc >= -1) {
      this.force = 0
      this.forceAc = 0
      this.pos.y = height/2 - this.y
    }

  }

  this.update = function () {

        this.score++

        this.lines = [
          [createVector(this.pos.x + this.sizex/2, this.pos.y + this.sizey/2),
          createVector(this.pos.x - this.sizex/2, this.pos.y + this.sizey/2)],

          [createVector(this.pos.x + this.sizex/2, this.pos.y + this.sizey/2),
          createVector(this.pos.x + this.sizex/2, this.pos.y - this.sizey/2)],

          [createVector(this.pos.x + this.sizex/2, this.pos.y - this.sizey/2),
          createVector(this.pos.x - this.sizex/2, this.pos.y - this.sizey/2)],

          [createVector(this.pos.x - this.sizex/2, this.pos.y - this.sizey/2),
          createVector(this.pos.x - this.sizex/2, this.pos.y + this.sizey/2)]
        ]
  }

  this.draw = function () {
    this.index += this.animationSpeed
    let index = floor(this.index) % animationDino.length
    image(animationDino[index], this.pos.x + 1, this.pos.y + 3, 48, 48)
  }
}
