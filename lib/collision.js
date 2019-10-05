class hitbox {
  constructor(x, y, sizex, sizey) {
    this.ptop = y
    this.pbottom = y + sizey
    this.pleft = x
    this.pright = x + sizex

    this.lines = [
      [
        createVector(this.pleft, this.ptop),
        createVector(this.pright, this.ptop),
      ],
      [
        createVector(this.pright, this.ptop),
        createVector(this.pright, this.pbottom),
      ],
      [
        createVector(this.pright, this.pbottom),
        createVector(this.pleft, this.pbottom),
      ],
      [
        createVector(this.pleft, this.pbottom),
        createVector(this.pleft,this.ptop )
      ]
    ]
  }

  update(x, y, sizex, sizey) {
    this.ptop = y
    this.pbottom = y + sizey
    this.pleft = x
    this.pright = x + sizex

    this.lines = [
      [
        createVector(this.pleft, this.ptop),
        createVector(this.pright, this.ptop),
      ],
      [
        createVector(this.pright, this.ptop),
        createVector(this.pright, this.pbottom),
      ],
      [
        createVector(this.pright, this.pbottom),
        createVector(this.pleft, this.pbottom),
      ],
      [
        createVector(this.pleft, this.pbottom),
        createVector(this.pleft,this.ptop )
      ]
    ]
  }

}

function intersect(p1, p2, p3, p4) {
  if (   ( ( (p1.x - p2.x) * (p3.y - p4.y) ) - ( (p1.y - p2.y) * (p3.x - p4.x) )  )  != 0 ) {
    let t

    t = (  ( (p1.x - p3.x) * (p3.y - p4.y) ) - ( (p1.y - p3.y) * (p3.x - p4.x) )  ) / (  ( (p1.x - p2.x) * (p3.y - p4.y) ) - ( (p1.y - p2.y) * (p3.x - p4.x) )  )

    let u

    u = (  ( (p1.x - p2.x) * (p1.y - p3.y) ) - ( (p1.y - p2.y) * (p1.x - p3.x) )  ) / (  ( (p1.x - p2.x) * (p3.y - p4.y) ) - ( (p1.y - p2.y) * (p3.x - p4.x) )  )

    return {
      t : t,
      u : u
    }
  } else {
    return {
      t : 300,
      u : 300
    }
  }
}

function collision(hitbox1, hitbox2){
  for (let i = 0; i < hitbox1.lines.length; i++) {
    for (let j = 0; j < hitbox2.lines.length; j++) {
      let intersects = intersect(hitbox1.lines[j][0], hitbox1.lines[j][1],hitbox2.lines[i][0], hitbox2.lines[i][1])
      if (intersects.t >= 0 && intersects.t  <= 1 && intersects.u <= 0 && intersects.u >= -1) {
        return true
        break
      }
    }
  }
}
