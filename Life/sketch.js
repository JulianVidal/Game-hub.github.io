let i = 0

let color;

let squareArr = []

let aliveArr = []

const squareSize = 10

// const canvasX = squareSize * floor(windowHeight/squareSize)
// const canvasY = squareSize * floor(windowWidth / squareSize)

function randomColor() {
  if (floor(random(3)) == 1) {
  color = 0
} else {
  color = 255
}
}


function square (x, y, c) {

  this.x = x,

  this.y = y,

  this.c = c

}

function squareMakeX (y) {

  for(x = 0; x < width / squareSize; x++ ) {

  randomColor()

  squareArr[i] = new square((x * squareSize), (y * squareSize), color)

  i++

  }
}

function squareMakeY() {

  for (y = 0; y < height / squareSize; y++) {

    squareMakeX(y)

  }

}

function squareDraw() {

  for (i = 0; i < squareArr.length; i ++) {

    fill(squareArr[i].c)

    rect(squareArr[i].x, squareArr[i].y, squareSize, squareSize)

  }

}

function setup () {

  createCanvas (500, 500)

  squareMakeY ()

  squareDraw()

  //noLoop()

  frameRate(15)

}

function draw () {

  squareDraw()

  checkNeighbors()

  checkAlive()

}

function checkNeighbors() {

  for (i = 0; i < squareArr.length; i++) {

    let alive = 0

    if (typeof squareArr[i - (floor(width/squareSize) + 1)] === "undefined") {

    }else if (squareArr[i - (floor(width/squareSize) + 1)].c == 255){

      alive++

    } else {

    }

    if (typeof squareArr[i - (floor(width/squareSize))] === "undefined") {

    }else if (squareArr[i - (floor(width/squareSize))].c == 255){

      alive++

    } else {

    }


    if (typeof squareArr[i - (floor(width/squareSize) -1)] === "undefined") {

    }else if (squareArr[i - (floor(width/squareSize) - 1)].c == 255){

      alive++

    } else {

    }


    if (typeof squareArr[i + 1] === "undefined") {

    }else if (squareArr[i + 1].c == 255){

      alive++

    } else {

    }


    if (typeof squareArr[i + (floor(width/squareSize) + 1)] === "undefined") {

    }else if (squareArr[i + (floor(width/squareSize) + 1)].c == 255){

      alive++

    } else {

    }

    if (typeof squareArr[i + (floor(width/squareSize))] === "undefined") {

    }else if (squareArr[i + (floor(width/squareSize))].c == 255){

      alive++

    } else {

    }


    if (typeof squareArr[i + (floor(width/squareSize) - 1)] === "undefined") {

    }else if (squareArr[i + (floor(width/squareSize) - 1)].c == 255){

      alive++

    } else {

    }


    if (typeof squareArr[i - 1] === "undefined") {

    }else if (squareArr[i - 1].c == 255){

      alive++

    } else {

    }

    aliveArr[i] = alive

}
}

function checkAlive() {

  for (i = 0; i < aliveArr.length; i++) {

    if (squareArr[i].c == 0) {
    if (aliveArr[i] == 3) {
      squareArr[i].c = 255
    }
    }

    if (squareArr[i].c == 255) {
    if (aliveArr[i] <= 1) {
      squareArr[i].c = 0
    }
    }

    if (squareArr[i].c == 255) {
    if (aliveArr[i] >= 4) {
      squareArr[i].c = 0
    }

  }

}



}

// function mousePressed() {
//
//   loop()
//
// }
//
// function mouseReleased() {
//
//   noLoop()
//
// }
