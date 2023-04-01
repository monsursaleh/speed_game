// All circle selector circles are circle container
const circles = document.querySelectorAll('.circle')
console.log(circles)
const scoreTextAll = document.querySelectorAll('.score')
const scoreMain = document.querySelector('.score-main')
const scoreModal = document.querySelector('.score-modal')

const overlay = document.querySelector('#overlay')
//  All Buttons
const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const closeButton = document.querySelector('#close')

const audio = document.querySelector('#btn-audio')

// Global variable
let active = 0
let score = 0
let speed = 2000
let round = 0
let timer

// game soudn class
function sound(src) {
  this.sound = document.createElement('audio')
  this.sound.src = src
  this.sound.setAttribute('preload', 'auto')
  this.sound.setAttribute('controls', 'none')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.play = function () {
    this.sound.play()
  }
  this.stop = function () {
    this.sound.pause()
  }
}

// gmae sound objects
let startSound = new sound('./sounds/start_game.mp3')
let stopSound = new sound('./sounds/end_game.mp3')

// start and stop game fucntions
const startMusic = () => {
  startSound.play()
}

const stopMusic = () => {
  startSound.stop()
  stopSound.play()
}

// need random number so that circle get highligthed after starting the game and make sure number is not repeated twice

let getRandomNum = (active) => {
  let randomNum = Math.floor(Math.random() * 4)
  if (active === randomNum) {
    randomNum = Math.floor(Math.random() * 4)
  }
  return randomNum
}

// every right click score will be updated

circles.forEach((circle, i) => {
  circle.addEventListener('click', () => {
    console.log('index cliked', i)
    rightClick(i)
  })
})
// right click function for event lister for every circles
let rightClick = (i) => {
  if (i != active) {
    stopGame()
  } else {
    score++
    round--
  }
}

///starting the game main fucntion

let startGame = () => {
  console.log('---starting the game main fucntion----')
  startMusic()
  circles.forEach((circle) => {
    circle.pointerEvents = 'auto'
  })
  // Flipping the buttons after game started so that we can find the stop button
  startButton.style.display = 'none'
  stopButton.style.display = 'inline-block'
  // CALL RANDOM FUNC TO GET NEW ACTIVE CIRCLE
  let newlyactive = getRandomNum(active)
  circles[newlyactive].classList.toggle('active')
  circles[active].classList.remove('active')
  // NOT REPEAT SAME CIRCLE
  active = newlyactive
  console.log('display newly active circle', active)
  /// CALL START GAME BY SET TIME OUT TO REDERING THE CIRCLE
  timer = setTimeout(startGame, speed)

  speed = speed - 20
  round++
  // scoreModal.textContent = score
  if (round >= 3) {
    stopGame()
  }
}

//display scores in modal and main dashbord
// scoreModal.textContent = score

// Stop the game during play to visible the overlay
let stopGame = () => {
  console.log('--end game--')
  scoreModal.textContent = score
  if (score === 0) {
    scoreModal.textContent = 'Start the Game🥸'
  } else if (score < 10) {
    scoreModal.textContent = 'Nice try! 🤗'
  } else if (score < 20) {
    scoreModal.textContent = 'Great job! 🤗'
  } else if (score < 30) {
    scoreModal.textContent = 'Amazing!👍'
  } else {
    scoreModal.textContent = 'Incredible!🤘'
  }
  stopMusic()
  clearTimeout(timer)
  overlay.style.visibility = 'visible'
}
// close modal and winddow reload
let closeGame = () => {
  window.location.reload()
}
// All event lister
startButton.addEventListener('click', startGame)
stopButton.addEventListener('click', stopGame)
closeButton.addEventListener('click', closeGame)
