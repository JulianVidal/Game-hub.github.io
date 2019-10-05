function bird() {
  this.pos = createVector(width, height/3 - 40)
  this.sizex = 25
  this.sizey = 20
  this.vel = 5

  this.draw = function () {
    fill(255)

    image(spriteBirdImage, this.pos.x, this.pos.y, 48, 48)
  }

  this.update = function (){
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

    this.pos.x -= this.vel
    this.vel = 5 + counter/1000
  }

  this.remove = function (j) {
      if (birds[j].pos.x < -this.sizex) {
        birds.splice(j, 1)
      }
    }

  this.collision = function (object, c) {
    for (let i = 0; i < object.lines.length; i++) {
      for (let j = 0; j < this.lines.length; j++) {
        this.intersect = collision(this.lines[j][0], this.lines[j][1], object.lines[i][0], object.lines[i][1])
        if ( this.intersect.t >= 0 && this.intersect.t  <= 1 && this.intersect.u <= 0 && this.intersect.u >= -1) {
          gameOver(c)
          break
        }
      }
    }
}

}
