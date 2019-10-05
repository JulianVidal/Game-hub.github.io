function nextGeneration() {

  calculateFiteness()

  for (var i = 0; i < totalPopulation; i++) {
    dinos[i] = pickOne()
  }

  walls = []
  birds = []
  score = 0
  counter = 0
  framesWall = 30
  framesCloud = 30
  highscore = 0
  generation++

  oldDinos = []
}

function calculateFiteness() {

  let sum = 0

  for (var i = 0; i < oldDinos.length; i++) {
    sum += oldDinos[i].score
  }

  for (var i = 0; i < oldDinos.length; i++) {
    oldDinos[i].fitness = oldDinos[i].score / sum
  }


}

function pickOne() {

  let index = 0
  let r = random(1)

  while (r > 0) {
    r = r - oldDinos[index].fitness
    index++
  }

  index--

  let dino = oldDinos[index]
  let child = new player(dino.brain)
  child.mutate()
  return child

}
