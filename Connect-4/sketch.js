let holes = []
let cols = 7
let rows = 6
let rectSizex = 550
let rectSizey = 450
let pieces = []
let bool = true

function setup() {

  createCanvas(900, 500)

  for (let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      holes.push(new hole(j, i))
    }
  }

  frameRate(5)
}

function draw() {

  background(0)

  rectMode(CENTER)
  fill(255)
  rect( width / 2, height / 2, rectSizex, rectSizey)

  for (let i = 0; i < holes.length; i++){
  holes[i].draw()
}


  for (let j = 0; j < pieces.length; j++) {
    pieces[j].draw()
    pieces[j].update()
  }

}

function mouseClicked() {
  for (let i = 0; i < holes.length; i++) {
    holes[i].click()
  }
}
