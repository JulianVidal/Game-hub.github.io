//Width of each bar
const wide =   10

//Height and Width of the canvas
let     w
let     h

//Declaration of the array that will contain all the bars
let bars   =  []

let buttons = []

//Declaration of index that will keep track of the current index of the bar we are comparing
var index  =  0

//Declares and defines the background color
let backgroundColor = '#111111'

//Declares the slider that will change the speed
let slider

let wideInput

//Makes the animation of the green color slowly filling the bars
let colorIndex = 0

//Different booleans that will control what is drawn on the canvas
//
//Controls if the main menu will be draw
let mainMenu = false

//Controls if the bubble sorting will be drawn
let bubble = false

//Controls if the insertion algorithm will be drawn
let insertion = false

//Controls if the quick sort algorithm will be drawn
let quick = true

//Controls if the parameter selection will be drawn
let parameter = false

let partition = false

let partitions_max

let partitions = 0

//let partitions_max = 1000

let counter = 0

let seconds = 0

let sec

let startFrameCount

let indexNewColor

let beep

let set = 0;

let done = false;

let swapped = 0;

function preload() {
  beep = loadSound('Sound/Beep.mp3')
}

function setup() {
  beep.setVolume(0.1)
  //Creates the canvas based on our Height and Width
  createCanvas((Math.floor((windowWidth - 20) / 100)) * 100, windowHeight/1.5)

  w  = width
  h  = height

  //Sets the framerate of the draw function
  frameRate(60)

  setupBars()

  partitions_max = bars.length

  //wideInput = createInput()

  //wideInput.position(35, h / 2)

  //Creates the buttons at the main menu
  let center = w/2
  let heightCenter = 400
  buttons.push(new button(center, heightCenter / 4, 200, 100, "Bubble Sort"))
  buttons.push(new button(center, (2 * heightCenter) / 4 + 10, 200, 100, "Insertion Sort"))
  buttons.push(new button(center, (3 * heightCenter) / 4 + 20, 200, 100, "Quick sort"))

}


function draw() {

  if (mainMenu == true) {

    //Changes the background color to backgroundColor
    background(backgroundColor)

    //Draws the buttons that were declared in setup
    for (var i = 0; i < buttons.length; i++) {

      buttons[i].draw()

    }

  }

  if (bubble == true){

    bubbleSort()

  }

  if (insertion == true) {
    beep.setVolume(0.06)

    insertionSort()

  }

  if (quick == true) {
    if (set == 0) {
      quickSort(0, (w - wide));
      set = 1;
    }
    barDraw();
  }

  if (quick == true || insertion == true || bubble == true) {
    colors()
  } else {
    startFrameCount = frameCount
  }

}

async function quickSort(start, end) {
  let pivot;
  let partionStart = start + wide;
  let partionEnd   = end;

  pivot = pickPivot(start, end);
  //console.log(start, end);
  if (start < end) {
    let middle = await partion(partionStart, partionEnd, pivot);
    if (!middle) {
      quickSort(start, middle - wide);
      quickSort(middle + wide, end);
    }
  }
}

async function partion(start, end, pivot) {
  let low, high, lowStop, highStop;

  low  = start;
  high = end;
  lowStop   = compareLow(low, pivot);
  highStop  = compareHigh(high, pivot);

if (highStop != undefined && lowStop != undefined){
  if (lowStop < highStop){
     await swap(lowStop, highStop);
     await partion(start, end, pivot);

} else {
       await swap(highStop, pivot);
      // if ((highStop - wide) > 0) {
      //   await quickSort(start, (highStop - wide));
      // }
      //
      // await quickSort((highStop + wide) , end);
      return highStop;

    }
  }

  return highStop;
}

async function swap(element1, element2) {
  await sleep(10);
    let x = element1
    let y = element2

    element1Index = bars.findIndex(bar => bar.pos.x == element1);
    element2Index = bars.findIndex(bar => bar.pos.x == element2);

    bars[element1Index].pos.x = y;
    bars[element2Index].pos.x = x;
}

function compareLow(low, pivot) {
  if (low < w) {
    let pivotSize = bars[bars.findIndex(bar => bar.pos.x == pivot)].sizey;
    let lowSize   = bars[bars.findIndex(bar => bar.pos.x == low)].sizey;

    if (lowSize > pivotSize) {

      return low;

    } else {

      low += wide;

      return compareLow(low, pivot);

    }
  } else {
    return;
  }

  }


function compareHigh(high, pivot) {

  if (high >= 0) {
    let highSize   = bars[bars.findIndex(bar => bar.pos.x == high)].sizey;
    let pivotSize  = bars[bars.findIndex(bar => bar.pos.x == pivot)].sizey;
    if (highSize < pivotSize) {

      return high;

    } else {
        high -= wide;
        return compareHigh(high, pivot);
      }
  } else {

    return;
  }

  }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function pickPivot(start, end) {

  return start;
}

function bubbleSort() {

   barDraw()

  //Bubble sorting
  if (index < bars.length - 1) {

    //Stores the index of the current bar that is being compared
    let comparingI    =  bars.findIndex(bar => bar.pos.x == index * wide)
    //Stores the index of the bar to the right of the current bar that is being compared
    let comparedI     =  bars.findIndex(bar => bar.pos.x == index * wide + wide)

    //Stores the size of the current bar
    let comparingSize =  bars[comparingI].sizey

    //Stores the size of the bar next to the current bar
    let comparedSize  =  bars[comparedI].sizey

    //Stores the x position of the current bar
    let comparingPos  =  bars[comparingI].pos.x

    //Stores the position of the bar next to the current bar
    let comparedPos   =  bars[comparedI].pos.x

    //Sets the color of the bar that is being compared to red
    bars[comparingI].color = color(255, 0, 0)

    //Checks whether the size of the current bar we are on is bigger than the next barr
    if (comparingSize > comparedSize) {

      //If yes the bars will switch places
      bars[comparingI].pos.x  =  comparedPos
      bars[comparedI].pos.x   =  comparingPos
      beep.play()

    } else {

      //Turns the current bar white because it will no longer be compared
      bars[comparingI].color = color(255)

    }

    //Goes onto the next bar
    index++

  } else {

    //Solution for last bar staying red when no longer compared
    bars[bars.findIndex(bar => bar.pos.x == ((w/wide) - 1)* wide)].color = '#FFFFFF'

    //Restarts the sorting
    index = 0

  }
}

function insertionSort() {

  barDraw()

  //Bubble sorting
  if (index < bars.length - 1) {

    //Stores the index of the current bar that is being compared
    let comparingI    =  bars.findIndex(bar => bar.pos.x == index * wide)
    //Stores the index of the bar to the right of the current bar that is being compared
    let comparedI     =  bars.findIndex(bar => bar.pos.x == index * wide + wide)

    //Stores the size of the current bar
    let comparingSize =  bars[comparingI].sizey

    //Stores the size of the bar next to the current bar
    let comparedSize  =  bars[comparedI].sizey

    //Stores the x position of the current bar
    let comparingPos  =  bars[comparingI].pos.x

    //Stores the x position of the bar next to the current bar
    let comparedPos   =  bars[comparedI].pos.x

    bars[comparingI].color = color(255, 0, 0)

    //Checks whether the size of the current bar we are on is bigger than the next barr
    if (comparingSize > comparedSize) {

      //If yes the bars will switch places
      bars[comparingI].pos.x  =  comparedPos
      bars[comparedI].pos.x   =  comparingPos

      beep.play()

      for (var i = 0; i < (comparingPos) / wide; i++) {

        //Stores the index of the bar before the current bar that is being compared
        let newComparingI    =  bars.findIndex(bar => bar.pos.x == (index * wide) - ((i + 0) * wide))

        //Stores the index of the bar to the left of the new current bar that is being compared
        let newComparedI     =  bars.findIndex(bar => bar.pos.x == (index * wide) - ((i + 1) * wide))

        //Stores the size of the new current bar
        let newComparingSize =  bars[newComparingI].sizey

        //Stores the size of the bar next to the new current bar
        let newComparedSize  =  bars[newComparedI].sizey

        //Stores the x position of the new current bar
        let newComparingPos  =  bars[newComparingI].pos.x

        //Stores the x position of the bar next to the new current bar
        let newComparedPos   =  bars[newComparedI].pos.x

        indexNewColor = newComparingI

        //Checks the size of both bars
        if (newComparingSize < newComparedSize) {

          //If new current bar is smalle, then it switches
          bars[newComparingI].pos.x  =  newComparedPos
          bars[newComparedI].pos.x   =  newComparingPos

        } else {

          break

        }

      }
      beep.play()

      if (indexNewColor != undefined) {


        bars[indexNewColor].color = color(0, 0, 255)
        barDraw()
        bars[indexNewColor].color = color(255)

      }

    } else {
      bars[comparingI].color = color(255)
    }

    //Goes onto the next bar
    index++

  } else {
    //Solution for last bar staying red when no longer compared
    bars[bars.findIndex(bar => bar.pos.x == ((w/wide) - 1)* wide)].color = '#FFFFFF'
  }

}

function barDraw() {
  //Makes the canvas's background the color of backgroundColor
  background(backgroundColor)

  //Draws each barr
  for (var i = 0; i < bars.length; i++) {
    bars[i].draw()
  }

}

function colors() {
  let totalCorrect = 0


  for (var i = 0; i < bars.length; i++) {

    if (bars.findIndex(bar => bar.pos.x == i * wide && bar.sizey == (floor(10 * ((i + 2) * ( (h - 110) / (w / wide) ))))/10) != -1) {

      totalCorrect++

    }

  }

  if (totalCorrect == w / wide) {

    for (var i = 0; i < colorIndex; i++) {
      bars[bars.findIndex(bar => bar.pos.x == i * wide)].color = color(0, 255, 0)
    }

    if (colorIndex < w / wide) {
      colorIndex ++
    }
  }

  if (totalCorrect != w/wide) {
    sec = 0
    sec = Math.floor((frameCount - startFrameCount)/60)
  }
  fill(255)
  if (totalCorrect == w / wide) {
    fill(0, 255, 0)
  }
  text("Time: " + sec + "s", 100, h - 50)

}

function setupBars() {

  //Defines the array by pushing a new object into the array
  for (var i = 0; i < w / wide; i++) {
    bars.push(new bar(wide * i, i + 2))

    if(bars[i].pos.x != wide * i) {
      console.log("PANIC");
    }
  }

  //This part does the shuffling
  //Goes through the array from the end and picks a random index to switch its x position with
  for (var i = bars.length - 1; i > 0; i--) {

    //Declares all the varibale that are going to be used
    let j, x, y

    //Picks a random number within the index
    j = Math.floor(Math.random() * (i + 1))

    //Stores the position of each object
    x = bars[i].pos.x
    y = bars[j].pos.x

    //Switches the position of both objects to eachother
    bars[i].pos.x = y
    bars[j].pos.x = x

  }

  for (var i = bars.length - 1; i > 0; i--) {

    //Declares all the varibale that are going to be used
    let j, x, y

    //Picks a random number within the index
    j = Math.floor(Math.random() * (i + 1))

    //Stores the position of each object
    x = bars[i].sizey
    y = bars[j].sizey

    //Switches the position of both objects to eachother
    bars[i].sizey = y
    bars[j].sizey = x

  }

}

function mouseClicked() {

  //Checks every button at the main ment
  for (var i = 0; i < buttons.length; i++) {

    //Checks if the mouse has been click inside the button
    if (buttons[i].click()) {

      //Checks the index to know what button was pressed
      switch (i) {

        case 0:

        //Changes the booleans to draw the right sort in the canvas
        mainMenu = false
        bubble = true
        insertion = false
        quick = false
        break;

        case 1:

        //Changes the booleans to draw the right sort in the canvas
        mainMenu = false
        bubble = false
        insertion = true
        quick = false
        break;

        case 2:

        //Changes the booleans to draw the right sort in the canvas
        mainMenu = false
        bubble = false
        insertion = false
        quick = true
        break;

        default:

      }

    }

  }

}
