function wall() {
  this.pos = createVector(width, height/2 - 30)
  this.sizex = 10
  this.sizey = 30
  this.vel = 5
  this.intersec = 20
  this.random = Math.random()

  this.draw = function () {
    this.lines = [
      [createVector(this.pos.x - this.sizex/2, this.pos.y - this.sizey/2),
      createVector(this.pos.x + this.sizex/2, this.pos.y + this.sizey/2)],

      [createVector(this.pos.x + this.sizex/2, this.pos.y + this.sizey/2),
      createVector(this.pos.x + this.sizex/2, this.pos.y - this.sizey/2)],

      [createVector(this.pos.x + this.sizex/2, this.pos.y - this.sizey/2),
      createVector(this.pos.x - this.sizex/2, this.pos.y - this.sizey/2)],

      [createVector(this.pos.x - this.sizex/2, this.pos.y - this.sizey/2),
      createVector(this.pos.x - this.sizex/2, this.pos.y + this.sizey/2)]
    ]

    image(spriteCactusImage, this.pos.x + 1, this.pos.y - 7, 48, 48)

    if (this.random < .1) {
      image(spriteCactusImage, this.pos.x - 24, this.pos.y, 36, 36)
    }
  }

  this.update = function () {
    this.pos.x -= this.vel
    this.vel = 5 + frameCount/1000
    rateWall = Math.round(60 - frameCount/1000)
  }

  this.remove = function (j) {
      if (walls[j].pos.x < 0) {
        walls.splice(j, 1)
      }
  }

  this.collision = function(object) {

    for (let i = 0; i < object.lines.length; i++) {
      for (let j = 0; j < this.lines.length; j++) {
        this.intersect = collision(this.lines[j][0], this.lines[j][1], object.lines[i][0], object.lines[i][1])
        if ( this.intersect.t >= 0 && this.intersect.t  <= 1 && this.intersect.u <= 0 && this.intersect.u >= -1) {
          gameOver()
          break
        }
      }
    }
  }

}
