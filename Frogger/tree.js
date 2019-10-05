function tree(){
  this.vel = 1
  this.sizey = 15
  this.random = Math.random()
  this.spacing = 15
  this.margin = 2
  this.imageSizex = 15
  this.imageSizey = this.imageSizex * 3


  this.posy = function () {
    let n = floor(random(22, 42))

    return height - this.sizey * n
  }

  this.xsize = function () {
    let n = floor(random(2, 6))

    return (15 * n)
  }

  this.sizex = this.xsize()


  this.pos = createVector(-this.sizex, this.posy())


  this.draw = function() {
    this.lines = [
      [
        createVector(this.pos.x + this.margin, this.pos.y + this.margin),
        createVector(this.pos.x + this.sizex - this.margin, this.pos.y + this.margin)
      ],
      [
        createVector(this.pos.x  + this.sizex - this.margin, this.pos.y + this.margin),
        createVector(this.pos.x + this.sizex - this.margin, this.pos.y + this.sizey - this.margin)
      ],
      [
        createVector(this.pos.x + this.sizex - this.margin, this.pos.y + this.sizey - this.margin),
        createVector(this.pos.x + this.margin, this.pos.y + this.sizey - this.margin)
      ],
      [
        createVector(this.pos.x + this.margin, this.pos.y + this.sizey - this.margin),
        createVector(this.pos.x + this.margin, this.pos.y + this.margin)
      ]
    ]

    image(treeParts[0], this.pos.x, this.pos.y - 14, this.imageSizex, this.imageSizey)

    for (var i = 0; i < (this.sizex / 15) - 2; i++) {
      image(treeParts[1], this.pos.x + this.imageSizex * (i + 1), this.pos.y - 14, this.imageSizex, this.imageSizey)
    }

    image(treeParts[2], this.pos.x + ((this.sizex / 15) - 1) * 15, this.pos.y - 14, this.imageSizex, this.imageSizey)


    // for (var i = 0; i < this.lines.length; i++) {
    //   stroke('orange')
    //   line(this.lines[i][0].x, this.lines[i][0].y, this.lines[i][1].x, this.lines[i][1].y)
    // }
  }

  this.remove = function () {
    for (var i = 0; i < trees.length; i++) {
      if (trees[i].pos == this.pos && this.pos.x > width) {
        trees.splice(i, 1)
      }
    }
  }

  this.update = function() {
      this.remove()
      this.pos.x += this.vel
  }

  this.overlap = function () {
    for (var i = 0; i < trees.length; i++) {
      for (var j = i + 1; j < trees.length; j++) {
        if ((abs(trees[i].pos.x - trees[j].pos.x) < trees[i].sizex || abs(trees[i].pos.x - trees[j].pos.x) < trees[j].sizex) && trees[j].pos.y == trees[i].pos.y){
          trees.splice(j, 1)
        }
      }
    }
 }

}
