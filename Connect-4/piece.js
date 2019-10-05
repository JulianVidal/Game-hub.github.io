function piece(x, y, s){
  this.pos = createVector(x, y)
  this.grv = s + 25
  this.stack = -1
  this.color = color(0)

this.setup = function () {
  for (let i = 0; i < pieces.length; i++) {
    if (this.pos.x == pieces[i].pos.x) {
      this.stack++
    }
  }

  if (bool) {
    this.color = color(255, 0, 0)
    bool = false
  } else {
    this.color = color(0, 0, 255)
    bool = true
  }
}

  this.draw = function () {
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, s, s)
  }

  this.update = function () {
    if (this.pos.y < (435 - (75 * this.stack))) {
      this.pos.y += this.grv
    }
  }
}
