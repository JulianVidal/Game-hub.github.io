let spriteDataPlayer
let spriteSheetPlayer
let spriteDataEnemy
let spriteSheetEnemy
let spriteDataBullet
let spriteSheetBullet
let amountOfEnemy = 6
let enemyArr = []
let bulletArr = []

let animationPlayer = []
let animationEnemy = []
let animationBullet = []

function preload() {

  spriteDataPlayer = loadJSON('sprite/tankPlayer.json')

  spriteSheetPlayer = loadImage('sprite/tankPlayer.png')

  spriteDataEnemy = loadJSON('sprite/tankEnemy.json')

  spriteSheetEnemy = loadImage('sprite/tankEnemy.png')

  spriteDataBullet = loadJSON('sprite/bullet.json')

  spriteSheetBullet = loadImage('sprite/bullet.png')

}

function setup() {

  createCanvas(windowWidth-4, windowHeight-4)

  imageMode(CENTER)

  tankPlayer = new tankPlay()

  for (let i = 0; i < amountOfEnemy; i++) {
    enemyArr[i] = new tankEnemy()
  }

  let framesPlayer = spriteDataPlayer.frames

  for (let i = 0; i < framesPlayer.length; i++) {
    let pos = framesPlayer[i].position
    let img = spriteSheetPlayer.get(pos.x, pos.y, pos.w, pos.h)
    animationPlayer.push(img)
  }

  let framesEnemy = spriteDataEnemy.frames

  for (let i = 0; i < framesEnemy.length; i++) {
    let pos = framesEnemy[i].position
    let img = spriteSheetEnemy.get(pos.x, pos.y, pos.w, pos.h)
    animationEnemy.push(img)
  }

  let framesBullet = spriteDataBullet.frames

  for (let i = 0; i < framesBullet.length; i++) {
    let pos = framesBullet[i].position
    let img = spriteSheetBullet.get(pos.x, pos.y, pos.w, pos.h)
    animationBullet.push(img)
  }

}

function draw() {

  background('#FFFFaa')

  if (bulletArr.length >= 0) {

    for (let z = 0; z < bulletArr.length ; z++) {
      for (let v = 0; v < enemyArr.length; v++) {
        if (bulletArr.length >= 1) {
        bulletArr[z].collision(enemyArr[v])
      }
      }
    }

    for (let j = 0; j < bulletArr.length; j++){
    bulletArr[j].draw()
    bulletArr[j].move()
    }
  }


  for(let i = 0; i < enemyArr.length; i++) {
    enemyArr[i].draw()
    enemyArr[i].move()
  }

for (let c = 0; c < enemyArr.length; c++) {
    tankPlayer.collision(enemyArr[c])
}



tankPlayer.move()

tankPlayer.check()

tankPlayer.draw()



}

function mousePressed() {
  bulletArr.push(new bullet(tankPlayer))
}
