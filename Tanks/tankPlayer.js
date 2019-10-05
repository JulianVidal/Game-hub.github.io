function tankPlay() {
  this.pos = createVector(width/2, height/2)
  this.vel = createVector(0, 0)
  this.heading = 0
  this.death = false
  this.acc = createVector(0, 0)


  this.draw = function() {
    push()
    if (this.death == false) {

    this.heading = atan((dist(this.pos.x, 0, mouseX, 0)) / (dist(0, this.pos.y, 0, mouseY)))

    translate(this.pos.x, this.pos.y)

    if (mouseX < this.pos.x && mouseY < this.pos.y) {

      rotate(2*PI - this.heading)

      if (keyIsPressed === true) {
        image(animationPlayer[frameCount % animationPlayer.length], 0, 0, 96, 96)
      } else {
      image(animationPlayer[0], 0, 0, 96, 96)
    }

    } else if (mouseX < this.pos.x && mouseY > this.pos.y) {

      rotate(PI + this.heading)
      if (keyIsPressed === true) {
        image(animationPlayer[frameCount % animationPlayer.length], 0, 0, 96, 96)
      } else {
      image(animationPlayer[0], 0, 0, 96, 96)
    }

    }else if (mouseX > this.pos.x && mouseY > this.pos.y) {

      rotate(PI - this.heading)
      if (keyIsPressed === true) {
        image(animationPlayer[frameCount % animationPlayer.length], 0, 0, 96, 96)
      } else {
      image(animationPlayer[0], 0, 0, 96, 96)
    }

    }else {

    rotate(this.heading)
    if (keyIsPressed === true) {
      image(animationPlayer[frameCount % animationPlayer.length], 0, 0, 96, 96)
    } else {
    image(animationPlayer[0], 0, 0, 96, 96)
  }

  }
}

  pop()

}




  this.move = function() {

    if (keyIsPressed === true) {
      this.acc.x = 0.15
      this.acc.y = 0.15
    } else {
      this.acc.x = -0.07
      this.acc.y = -0.07

      if (this.vel.x > 0) {
        this.vel.x += this.acc.x
      } else {
        this.vel.x -= this.acc.x
      }

      if (this.vel.y > 0) {
        this.vel.y += this.acc.y
      } else {
        this.vel.y -= this.acc.y
      }


    }

    if (this.death == false) {

    if (this.pos.x > width || this.pos.y > height || this.pos.x < 0 || this.pos.y < 0){

      this.pos.x = width/2
      this.pos.y = height/2

    } else {

    if (keyIsDown (68)) {
      this.vel.x += this.acc.x
    }

    if (keyIsDown (65)) {
      this.vel.x -= this.acc.x
    }

    if (keyIsDown (87)) {
      this.vel.y -= this.acc.y
    }

    if (keyIsDown (83)) {
      this.vel.y += this.acc.y
    }

    this.vel.limit(8)
    this.pos.add(this.vel)
  }
}
    }



    this.collision = function(enemy) {
      if (dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y) < 25 ) {
        this.death = true
      }
  }

    this.check = function() {
      if (this.death == true) {
        noLoop()
      }
    }
  }
