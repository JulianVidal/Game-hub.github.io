function player() {
  this.sizex = 15
  this.sizey = 15
  this.pos = createVector(width/2, height - this.sizey - 15)
  this.vel = 20

  this.forward  = createVector(0, -this.vel)
  this.backward = createVector(0, this.vel)
  this.right = createVector(this.vel, 0)
  this.left = createVector(-this.vel, 0)


  this.draw = function() {
    noFill()
    stroke(255)
    strokeWeight(1.5)
    rectMode(CENTER)
    rect(this.pos.x, this.pos.y, this.sizex, this.sizey)
    this.collision()
  }

  this.move = function() {
    if (key === 'w') {
      this.pos.add(this.forward)
    }
    if (key === 'a') {
      this.pos.add(this.left)
    }
    if (key === 's') {
      this.pos.add(this.backward)
    }
    if (key === 'd') {
      this.pos.add(this.right)
    }
  }

  this.collision = function () {
    for (let i = 0; i < cars.length; i++) {
    if (dist(cars[i].pos.x, cars[i].pos.y, this.pos.x, this.pos.y) < 16){
      noLoop()
    }
    }
  }

}
