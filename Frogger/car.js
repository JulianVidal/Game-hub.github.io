function car(){
  this.vel = 2
  this.sizex = Math.random() < 0.25 ? 30 : 15
  this.sizey = 15
  this.random = Math.random()
  this.spacing = 15
  this.margin = 2
  this.color = Math.random()


  this.posy = function () {

    let n = floor(random(3, 20))

    return height - this.sizey * n
  }

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

    if (this.sizex == 30) {
       image(truckImage, this.pos.x, this.pos.y - 9, 32, 32)
    } else {
      if (this.color < 0.5) {
        image(greenCarImage, this.pos.x - 3, this.pos.y - 3, 23, 23)
      } else {
        image(blueCarImage, this.pos.x - 3, this.pos.y - 3, 23, 23)
      }
    }

    // for (var i = 0; i < this.lines.length; i++) {
    //   stroke('red')
    //   line(this.lines[i][0].x, this.lines[i][0].y, this.lines[i][1].x, this.lines[i][1].y)
    // }
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

  this.collision = function (player) {
    let intersected = collision(this, player)
    if (intersected) {
      noLoop()
    }
  }

  this.overlap = function () {
    for (var i = 0; i < cars.length; i++) {
      for (var j = i + 1; j < cars.length; j++) {
        if ((abs(cars[i].pos.x - cars[j].pos.x) < cars[i].sizex || abs(cars[i].pos.x - cars[j].pos.x) < cars[j].sizex) && cars[j].pos.y == cars[i].pos.y){
          cars.splice(j, 1)
        }
      }
    }
 }
}
