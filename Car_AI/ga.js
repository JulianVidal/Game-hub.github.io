function nextGeneration() {
  enemies = []

  generation++

  fitness()

  for (var i = 0; i < population; i++) {
    cars[i] = pickOne()
  }

  oldCars = []

}

function fitness() {
  let sum = 0

  for (var i = 0; i < oldCars.length; i++) {
    sum += oldCars[i].score
  }

  for (var i = 0; i < oldCars.length; i++) {
    oldCars[i].fitness = oldCars[i].score/sum
  }
}

function pickOne() {
  let index = 0
  let r = Math.random()

  while (r < 1) {
    if (index == oldCars.length) {
      r =1
    } else {
      r -= oldCars[index].fitness
      index++
    }
    index--

    let car = oldCars[index]
    let child = new player(car.brain)
    child.mutate()
    return child
  }
}
