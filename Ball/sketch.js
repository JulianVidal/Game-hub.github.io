let cCircleArr = []


let testArr = []


let totalCircle = 5


let img

let score = 0


// function preload() {

//

//   img = loadImage('image/gun.png')

//

// }



let random = () => {


  if ( Math.floor(Math.random() * 2) === 1) {


    return true


  } else {


    return false


  }


}


let checkx = object => {


  if (object.statex === true) {


    return 4


  } else {


    return -4


  }


}


let checky = object => {


  if (object.statey === true) {


    return 4


  } else {


    return -4


  }


}




function circles (x, y, d, state, speed, r, g, b, vert) {


  this.x = x,



  this.y = y,



  this.d = d,



  this.statex = state,



  this.statey = state,



  this.speed = speed,



  this.r = r,



  this.g = g,



  this.b = b,


  this.vert = vert


}





function setup () {


  createCanvas(windowWidth, windowHeight);


  //Circle Array

  for (let i = 0; i < totalCircle;i++) {


    circle = {


      x: Math.floor ( Math.random () * width ),


      y: Math.floor ( Math.random () * ( 3 * height / 4 ) ),


      d: 50,


      state: random(),


      speed:  Math.floor(Math.random() * 5 + 3 ),


      r: Math.floor(Math.random() * 255 - 50 ) ,


      g: Math.floor(Math.random() * 255 - 50 ),


      b: Math.floor(Math.random() * 255 - 50 ),


      vert: false


    }


    cCircleArr[i] = new circles( circle.x , circle.y, circle.d, circle.state, circle.speed, circle.r, circle.g, circle.b, circle.vert)


  }


  //Checking for positions

  for (let e = 0; e < testArr.length; e++) {


    if ( (cCircleArr[testArr[e][0]].d + cCircleArr[testArr[e][1]].d)/2 >= dist (cCircleArr[testArr[e][0]].x, cCircleArr[testArr[e][0]].y, cCircleArr[testArr[e][1]].x, cCircleArr[testArr[e][1]].y) ) {


      cCircleArr[testArr[e][0]].x = cCircleArr[testArr[e][0]].x + 50


      cCircleArr[testArr[e][1]].y = cCircleArr[testArr[e][0]].y + 50



    }


  }



  //Array with all possible combinations

  for (let i = 0; i < cCircleArr.length - 1; i++) {


    for (let j = i + 1; j < cCircleArr.length; j++) {


      testArr.push([i, j])


    }


  }


}


function draw () {


  background ('#000')


  circleDraw (cCircleArr)


  rectMode(CENTER)


  movingx (cCircleArr)


  movingy (cCircleArr)


  bounce (cCircleArr)


  bounceFix (cCircleArr)


  bounceFix (cCircleArr)


  bounceFix (cCircleArr)

  //bounceFix2 (cCircleArr)


  //mouseCircle ()


  // imageMode (CENTER)

  //

  // image(img, mouseX, height - 90, 90, 150 )

  

  fill(255)

  

  rect (mouseX, height - 90, 20, 75)


}


function bounce (array) {


  for (let e = 0; e < testArr.length; e++) {


    if ( (array[testArr[e][0]].d + array[testArr[e][1]].d)/2 >= dist (array[testArr[e][0]].x, array[testArr[e][0]].y, array[testArr[e][1]].x, array[testArr[e][1]].y) ) {


      if (array[testArr[e][0]].vert === false && array[testArr[e][1]].vert === false) {


        array[testArr[e][0]].statex = !array[testArr[e][0]].statex



        array[testArr[e][0]].statey = !array[testArr[e][0]].statey



        array[testArr[e][1]].statex = !array[testArr[e][1]].statex



        array[testArr[e][1]].statey = !array[testArr[e][1]].statey


      }


      if (array[testArr[e][0]].vert === true || array[testArr[e][1]].vert === true) {

score = score + 1
        
        array.splice(testArr[e][0], 1, '')


        testArr = []


        for (let i = 0; i < cCircleArr.length - 1; i++) {


          for (let j = i + 1; j < cCircleArr.length; j++) {


            testArr.push([i, j])


          }

        }


        array.splice(testArr[e][1], 1, '')


        testArr = []


        for (let i = 0; i < cCircleArr.length - 1; i++) {


          for (let j = i + 1; j < cCircleArr.length; j++) {


            testArr.push([i, j])


          }


        }


      }


    }


  }


}


function bounceFix (array) {


  for (let e = 0; e < testArr.length; e++) {


    if ( (array[testArr[e][0]].d + array[testArr[e][1]].d)/2 > dist (array[testArr[e][0]].x, array[testArr[e][0]].y, array[testArr[e][1]].x, array[testArr[e][1]].y) ) {


      array[testArr[e][0]].statex = array[testArr[e][0]].statex



      array[testArr[e][0]].statey = array[testArr[e][0]].statey



      array[testArr[e][1]].statex = array[testArr[e][1]].statex



      array[testArr[e][1]].statey = array[testArr[e][1]].statey


    }


  }


}


function bounceFix2 (array) {


  for (let e = 0; e < testArr.length; e++) {


    if ( (array[testArr[e][0]].d + array[testArr[e][1]].d)/2 > dist (array[testArr[e][0]].x, array[testArr[e][0]].y, array[testArr[e][1]].x, array[testArr[e][1]].y) ) {


      array[testArr[e][0]].x = array[testArr[e][0]].x + checkx (array[testArr[e][0]])


      array[testArr[e][0]].y = array[testArr[e][0]].y + checky (array[testArr[e][0]])


      array[testArr[e][1]].x = array[testArr[e][1]].x  + checkx (array[testArr[e][1]].x)


      array[testArr[e][1]].y = array[testArr[e][1]].y + checky (array[testArr[e][1]].y)


    }


  }


}



function movingx (array) {


  for (let i = 0; i < array.length; i++) {


    movex(array[i])


  }


}


function movingy (array) {


  for (let i = 0; i < array.length; i++) {


    if (array[i].vert === true && array[i].y <  -50) {


      array.splice(i, 1, '')


      testArr = []


      for (let j = i + 1; j < cCircleArr.length; j++) {


        testArr.push([i, j])


      }


    } else {


      movey(array[i])


    }


  }


}


function movex (array) {


  if (array.vert === true) {


  } else{


    if (array.statex === false) {


      array.x = array.x + array.speed


      if (array.x > width + 50) {


        array.statex = true


      }


    }


    if (array.statex === true) {


      array.x = array.x - array.speed


      if (array.x < - 50) {


        array.statex = false


      }


    }


  }


}



function movey (array) {



  if (array.statey === false) {



    array.y = array.y + array.speed



    if (array.y > (3 * height / 4)) {


      array.statey = true


    }


  }


  if (array.statey === true) {


    array.y = array.y - array.speed


    if (array.y <  -50) {


      array.statey = false


    }


  }


}



function circleDraw (array) {


  stroke ('#FFF')


  strokeWeight (2)


  for (let i = 0; i < array.length; i++) {


    fill (array[i].r, array[i].g, array[i].b)


    ellipse (array[i].x, array[i].y, array[i].d)


  }


}


function mouseCircle () {


  fill ('#FFF')


  ellipse (mouseX, mouseY, 10)


}




function mousePressed () {


  // clicked (cCircleArr)


  mouseC ()


}


// function clicked (array) {

//

//     array.forEach( (e) => {if ( dist(e.x, e.y, mouseX, mouseY) <= e.d) {e.r = 255, e.g = 255, e.b = 255} } )

//

// }


function mouseC () {
  
  if (mouseX >= (width * 0.75) && mouseX <= ( (width * 0.75) + 200) && mouseY >= 10 && mouseY <= 85) {
  
  } else {


  let i = cCircleArr.length


  circle = {


    x: mouseX,


    y: height - 150,


    d: 15,


    state: true,


    speed: 10,


    r: 255,


    g: 255,


    b: 255,


    vert: true


  }


  cCircleArr[i] = new circles( circle.x , circle.y, circle.d, circle.state, circle.speed, circle.r, circle.g, circle.b, circle.vert)


  testArr = []


  for (let i = 0; i < cCircleArr.length - 1; i++) {


    for (let j = i + 1; j < cCircleArr.length; j++) {


      testArr.push([i, j])


    }


  }
  
}

}

function addCircles() {

  
   let i = cCircleArr.length


circle = {


      x: Math.floor ( Math.random () * width ),


      y: Math.floor ( Math.random () * ( 3 * height / 4 ) ),


      d: 50,


      state: random(),


      speed:  Math.floor(Math.random() * 5 + 3 ),


      r: Math.floor(Math.random() * 255 - 50 ) ,


      g: Math.floor(Math.random() * 255 - 50 ),


      b: Math.floor(Math.random() * 255 - 50 ),


      vert: false


    }


  cCircleArr[i] = new circles( circle.x , circle.y, circle.d, circle.state, circle.speed, circle.r, circle.g, circle.b, circle.vert)


  testArr = []


  for (let i = 0; i < cCircleArr.length - 1; i++) {


    for (let j = i + 1; j < cCircleArr.length; j++) {


      testArr.push([i, j])


    }


  }
  
}

function scoring() {
return score 
}
                



document.getElementById("button").addEventListener("click", addCircles)
  
document.getElementById("score").addEventListener("change", scoring)