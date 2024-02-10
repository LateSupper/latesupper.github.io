const wheel = new Wheel()

function setupTextBoxes() {
  const tx = document.querySelectorAll(".option")
  for (let i = 0; i < tx.length; i++) {
    if (tx[i].getAttribute("data-ready") !== "true") {
      tx[i].addEventListener("focusout", updateWheel, false)
      tx[i].setAttribute("data-ready", "true")
    }
  }
}

function updateWheel() {
  if (!wheel.keepPrevious.checked) {
    wheel.clearHistory()
  }

  const tx = document.querySelectorAll(".option")
  var txCount = tx.length
  var rotateDegree = roundToThousandth(360 / txCount)

  wheel.element.innerHTML = ""

  var degree = 0
  for (let i = 0; i < txCount; i++) {
    if (i > 0) degree += rotateDegree

    let dClass = `d${txCount}`
    let bg = [ // random color
      randomInclusive(156, 255),
      randomInclusive(0, 127),
      randomInclusive(0, 127)
    ]

    let htm = `<div class="${dClass}" style="
      background-color: rgb(${bg[0]} ${bg[1]} ${bg[2]});
      transform: rotate(${degree}deg);
    ">
      ${tx[i].value}
    </div>`
    wheel.element.insertAdjacentHTML('beforeend', htm)
  }
}


function addOption() {
  const opts = document.querySelector("#options")
  if (opts.childElementCount < 20) {
    const tx = document.createElement("input")
    tx.classList.add("option")
    opts.appendChild(tx)

    setupTextBoxes()
    updateWheel()

    const optCount = document.querySelector("#option-count span")
    optCount.textContent = opts.childElementCount
  }
}

function removeOption() {
  const opts = document.querySelector("#options")
  if (opts.childElementCount > 2) {
    let lastChild = opts.lastChild
    opts.removeChild(lastChild)

    updateWheel()

    const optCount = document.querySelector("#option-count span")
    optCount.textContent = opts.childElementCount
  }
}

function spinWheel() {
  if (!wheel.spinning) wheel.spinning = true

  // Disable wheel option inputs / add & remove buttons
  wheel.options.querySelectorAll(".option").forEach(e => {
    e.setAttribute("disabled", "disabled")
  })
  document.querySelectorAll("#option-buttons a").forEach(e => {
    e.setAttribute("style", "pointer-events: none;")
  })

  // Determine winner
  const optCount = wheel.options.childElementCount
  const winnerIndex = randomInclusive(0, optCount - 1)

  // Determine rotation to specific angle
  const anglePerSegment = 360 / optCount
  const zeroOffset = anglePerSegment / 2
  const startAngle = ((anglePerSegment * winnerIndex) - zeroOffset)
  const winRange = [
    Math.ceil(startAngle) + 1,
    Math.floor(startAngle + anglePerSegment) - 1
  ]
  const destination = randomInclusive(winRange[0], winRange[1])

  // Determine how many rotations the wheel will spin (including spam-clicking increment)
  wheel.rotations = [wheel.rotations[0] + 5, wheel.rotations[1] + 5] // for incrementing spam-clicks
  const randomRotations = randomInclusive(wheel.rotations[0], wheel.rotations[1])
  const shownDestination = ((randomRotations * 360) + destination) * -1
  
  // Continue to spin 
  wheel.lastDest = 0 + shownDestination

  // Spin wheel
  wheel.playSound(wheel.sound)
  wheel.element.setAttribute("style", `transform: rotate(${wheel.lastDest}deg);`)
  
  // Reset wheel spinning interval for spam-clicking
  if (wheel.lastClick !== null) {
    clearInterval(wheel.lastClick)
    wheel.lastClick = null
    wheel.clickTimer = 0
  }
  wheel.lastClick = setInterval(() => {
    wheel.clickTimer += 1

    if (wheel.clickTimer >= wheel.spinTime) {
      // Finally be done spinning
      wheel.spinning = false
      wheel.clickTimer = 0
      clearInterval(wheel.lastClick)
      wheel.lastClick = null
      wheel.finalizeSpin(destination)
      wheel.finalizeWin(wheel.options.children[winnerIndex].value)
    }
  }, 1000)
}


// Setup Func.
function init() {
  setupTextBoxes()
  updateWheel()

  wheel.sound.playbackRate = 0.75
  wheel.sound.volume = 0.16

  wheel.winSound.playbackRate = 1.666
  wheel.winSound.volume = 0.16
}

(() => {
  init()
})()