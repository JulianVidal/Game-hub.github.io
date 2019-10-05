function player() {
  this.sizex = 15
  this.sizey = 15
  this.pos = createVector(width/2, height - this.sizey)
  this.vel = 15

  this.forward  = createVector(0, -this.vel)
  this.backward = createVector(0, this.vel)
  this.right = createVector(this.vel, 0)
  this.left = createVector(-this.vel, 0)

  this.velx = 0

  this.inter = 0

  this.safe = false



  this.draw = function() {
        this.lines = [
          [
            createVector(this.pos.x, this.pos.y),
            createVector(this.pos.x + this.sizex, this.pos.y )
          ],
          [
            createVector(this.pos.x  + this.sizex, this.pos.y),
            createVector(this.pos.x + this.sizex, this.pos.y + this.sizey)
          ],
          [
            createVector(this.pos.x + this.sizex, this.pos.y + this.sizey),
            createVector(this.pos.x, this.pos.y + this.sizey)
          ],
          [
            createVector(this.pos.x, this.pos.y + this.sizey),
            createVector(this.pos.x, this.pos.y)
          ]
        ]


    // for (var i = 0; i < this.lines.length; i++) {
    //   stroke('red')
    //   line(this.lines[i][0].x, this.lines[i][0].y, this.lines[i][1].x, this.lines[i][1].y)
    // }
    image(frogImage, this.pos.x - 7, this.pos.y - 7, 30, 30)

  }

  this.move = function() {
    if (keyCode === UP_ARROW) {
      this.pos.add(this.forward)
    }
    if (keyCode === LEFT_ARROW) {
      this.pos.add(this.left)
    }
    if (keyCode === DOWN_ARROW) {
      this.pos.add(this.backward)
    }
    if (keyCode === RIGHT_ARROW) {
      this.pos.add(this.right)
    }

  }

  this.update = function () {
    this.carry()
    this.pos.x += this.velx
  }

  this.carry = function () {
    this.inter = 0
    for (var i = 0; i < trees.length; i++) {
      let intersected = collision(this, trees[i])
      if (intersected) {
        this.inter++
      }
    }

    if (this.inter > 0) {
      this.safe = true
      this.velx = 1
    } else {
      this.safe = false
      this.velx = 0
    }
  }

  this.boundaries = function () {
    if (this.pos.x < width && this.pos.y < height / 2 + 7.5) {
      if (!(this.safe)) {
      noLoop()
      }
    }

    if (this.pos.x > width - 15 || this.pos.x < 0 || this.pos.y > height - 15 || this.pos.y < 0) {
      noLoop()
    }
  }
}
