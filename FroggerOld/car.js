function car(){
  this.vel = 2
  this.sizex = 25
  this.sizey = 15
  this.random = Math.random()

  this.posy = function () {
    if (this.random < 0.33) {
      return (width/2) + (this.sizex)
    } else if (this.random < 0.66) {
      return (width/2)
    } else {
      return (width/2) + (this.sizex * 2)
    }
  }

  this.pos = createVector(this.sizex/2 - this.sizex, this.posy())

  this.draw = function() {
    rect(this.pos.x, this.pos.y, this.sizex, this.sizey)
  }

  this.remove = function () {
    for (var i = 0; i < cars.length; i++) {
      if (cars[i].pos == this.pos && this.pos.x > width) {
        cars.splice(i, 1)
      }
    }
  }

  this.update = function() {
      this.remove()
      this.pos.x += this.vel
  }
}
