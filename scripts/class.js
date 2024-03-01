class Wheel {
  constructor() {
    this.element = document.querySelector("#wheel")
    this.sound = document.querySelector("#wheel-sound")
    this.winSound = document.querySelector("#win-sound")
    this.options = document.querySelector("#options")
    this.history = document.querySelector("#history")
    this.keepPrevious = document.querySelector("#keep-previous")
    this.spinTime = 4
    this.spinning = false
    this.lastClick = null
    this.clickTimer = 0
    this.lastDest = 0

    this.rotations = [0, 5]
  }

  playSound(sound) {
    if (!sound.paused) {
      sound.pause()
      sound.currentTime = 0
    }
    sound.play()
  }

  finalizeSpin(destination) {
    this.options.querySelectorAll(".option").forEach(e => {
      e.removeAttribute("disabled")
    })
    document.querySelectorAll("#option-buttons a").forEach(e => {
      e.setAttribute("style", "")
    })

    this.element.setAttribute("style", `transition: none; transform: rotate(${destination * -1}deg);`)
    this.rotations = [0, 5]
    this.lastDest = destination
  }

  finalizeWin(winner) {
    this.addHistory(winner)
    this.playSound(this.winSound)
  }

  addHistory(winner) {
    var htm = "", winCount = 1

    this.history.querySelectorAll(".history-item").forEach(w => {
      if (w.textContent === winner) winCount += 1
    })
    if (winCount > 1)
      htm = `<div class="history-item">[<span>${winCount}</span>] ${winner}</div>`
    else
      htm = `<div class="history-item">${winner}</div>`
    
    this.history.insertAdjacentHTML("afterbegin", htm)
  }

  clearHistory() {
    this.history.innerHTML = ""
  }
}

class OptionList {
  constructor(name) {
    this.name = name
  }
}

class SavedLists {
  constructor() {

  }
}