function tankEnemy(r) {
  this.pos = createVector(floor(random(20, windowHeight-20)), floor(random(20, windowHeight-20)))
  this.vel = createVector(0, 0)

  this.delete = function (array) {
    array.splice(this.index, 1)
  }

  this.draw = function () {

    push()
    translate(this.pos.x, this.pos.y)
    if ( this.vel.x < 0 && this.vel.y < 0) {

      rotate(2*PI - atan(this.vel.x/this.vel.y))
      image(animationEnemy[frameCount % animationEnemy.length], 0, 0, 100, 100)

    }else if (this.vel.x < 0 && this.vel.y > 0) {

      rotate(3*PI -  atan(this.vel.x/this.vel.y))
      image(animationEnemy[frameCount % animationEnemy.length], 0, 0, 100, 100)

    } else if (this.vel.x > 0 && this.vel.y > 0) {

      rotate(PI/2 + atan(this.vel.x/this.vel.y))
      image(animationEnemy[frameCount % animationEnemy.length], 0, 0, 100, 100)

    } else if (this.vel.x > 0 && this.vel.y < 0) {

      rotate(PI/2 + atan(this.vel.x/this.vel.y))
      image(animationEnemy[frameCount % animationEnemy.length], 0, 0, 100, 100)

    }
    pop()
  }

  this.speed = function () {
    if (Math.random() < 0.25) {
      return 2
    } else if (Math.random() < 0.25) {
      return 3
    } else if (Math.random() < 0.25) {
      return -2
  } else if (Math.random() < 0.25) {
    return -3
  } else {
    return 3
  }
}

this.speed2 = function(vel) {
  if (Math.random() < 0.5) {
    return vel
  } else {
    return -vel
  }
}

this.vel.x = this.speed()
this.vel.y = this.speed2(this.vel.x)

  this.move = function () {
  if (this.pos.x + 20 > width || this.pos.x < 15){
    this.vel.x *= -1
  }

  if (this.pos.y + 20 > height || this.pos.y < 15){
    this.vel.y *= -1
  }

    this.pos.add(this.vel)

    this.index = enemyArr.findIndex(element => {return element.pos.x == this.pos.x})
}

}
