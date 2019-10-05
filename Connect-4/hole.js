function hole(x, y) {
  this.pos = createVector(x * 75 + (width/2 - rectSizex/2) + 50, y * 75 + (height/2 - rectSizey/2) + 35)
  this.size = 50

  this.draw = function() {
    fill(0)
    noStroke()
    ellipse (this.pos.x, this.pos.y, this.size, this.size)
  }

  this.click = function() {
    if (dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.size/2 && this.pos.y < 70) {
    pieces.push(new piece(this.pos.x, this.pos.y, this.size))
    pieces[pieces.length - 1].setup()
  }
  }
}
