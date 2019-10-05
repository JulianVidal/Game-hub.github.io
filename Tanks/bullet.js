function bullet(player) {
  this.pos = createVector(player.pos.x, player.pos.y)
  this.r = 10

  if (mouseX < this.pos.x && mouseY < this.pos.y) {
    this.vel = p5.Vector.fromAngle(3/2*PI - player.heading)
  }else if (mouseX < this.pos.x && mouseY > this.pos.y) {
    this.vel = p5.Vector.fromAngle(HALF_PI +  player.heading)
  }else if (mouseX > this.pos.x && mouseY > this.pos.y) {
    this.vel = p5.Vector.fromAngle(HALF_PI - player.heading)
  }else {
  this.vel = p5.Vector.fromAngle(3/2 * PI + player.heading)
}

this.vel.mult(10)

this.delete = function (array) {
  array.splice(this.index, 1)
}

this.draw = () => { image(animationBullet[frameCount % animationBullet.length], this.pos.x, this.pos.y, 48, 48)}

this.move = function() {

  if (this.pos.x + this.r > width || this.pos.x < this.r){
    this.delete(bulletArr)
  }
  if (this.pos.y + this.r > width || this.pos.y < this.r){
    this.delete(bulletArr)
  }

  this.pos.add(this.vel)

  this.index = bulletArr.findIndex(element => {return element.pos.x == this.pos.x})

}

  this.collision = function(enemy) {
    if (dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y) < 25 ) {
      this.delete(bulletArr)
      enemy.delete(enemyArr)
    }
}

}
