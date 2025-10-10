const updateDotInfo = () => {
  const DOTINFO = document.querySelector("#dotinfo")
  const DOTINFO_TEXT = "info"

  if (DOTINFO.textContent != DOTINFO_TEXT) {
    let t = setInterval(() => {
      // This "if" fixes a glitch with the interval while window is idle
      if (DOTINFO_TEXT[DOTINFO.textContent.length] != undefined) {
        DOTINFO.textContent += DOTINFO_TEXT[DOTINFO.textContent.length]
      }
      
      if (DOTINFO.textContent == DOTINFO_TEXT) {
        clearInterval(t)
      }
    }, 100)
  }
  else {
    let t = setInterval(() => {
      DOTINFO.textContent = DOTINFO.textContent.substring(0, DOTINFO.textContent.length - 1)
      
      if (DOTINFO.textContent == "") {
        clearInterval(t)
      }
    }, 100)
  }
}

(() => {
  setInterval(updateDotInfo, 3000)
})()