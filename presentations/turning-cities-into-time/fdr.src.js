
class Fdr {

  constructor(element) {
    if (element == null) {
      element = document.querySelector(".fdr")
    }

    this._nextElements = []
    this._previousElements = []
    this._positionCallbacks = []
    this._boundKeyboard = false
    this._boundHashChange = false
    this._parent = element
    this._current = this._parent.children[0]
    this._updateInterface()
  }

  next() {
    this.jump(this._current.nextElementSibling)
  }

  previous() {
    this.jump(this._current.previousElementSibling) 
  }

  jump(target) {
    console.log("TARGET", target, "HASH", window.location.hash)
    target = this._resolveElement(target)
    console.log("TARGETELEMENT", target)
    this._current = target
    this._updateInterface()
    this._updateHash()
  }

  bindNext(target) {
    if (target == null) {
      return
    }
    if (typeof target === "string") {
      return this.bindNext(document.querySelector(target))
    }
    
    const that = this
    target.addEventListener("click", () => {
      that.next()
    })
    this._nextElements.push(target)
    this._updateInterface()
  }
  
  bindPrevious(target) {
    if (target == null) {
      return
    }
    if (typeof target === "string") {
      return this.bindPrevious(document.querySelector(target))
    }
    
    const that = this
    target.addEventListener("click", () => {
      that.previous()
    })
    this._previousElements.push(target)
    this._updateInterface()
  }

  _updateNavigation() {
    for (let j = 0; j < this._nextElements.length; j++) {
      this._nextElements[j].classList.remove("disabled")
    }
    for (let j = 0; j < this._previousElements.length; j++) {
      this._previousElements[j].classList.remove("disabled")
    }
    if (this._currentIndex === 0) {
      for (let j = 0; j < this._previousElements.length; j++) {
        this._previousElements[j].classList.add("disabled")
      }
    }
    if (this._currentIndex === this.size - 1) {
      for (let j = 0; j < this._nextElements.length; j++) {
        this._nextElements[j].classList.add("disabled")
      }
    }
  }
  
  bindPosition(cb) {
    this._positionCallbacks.push(cb)
  }
  
  bindKeyboard() {
    if (this._boundKeyboard) {
      return
    }
    this._boundKeyboard = true
    const that = this
    window.addEventListener("keydown", (e) => {
      switch (e.which) {
        case 36: // home
          that.jump(0)
          e.preventDefault()
          break
        case 35: // end
          that.jump(that.size - 1)
          e.preventDefault()
          break
        case 32: // spacebar
        case 39: // right arrow
        case 34: // page down
          that.next()
          e.preventDefault()
          break
        case 37: // left arrow
        case 33: // page up
          that.previous()
          e.preventDefault()
          break
        case 70: // f
          that.fullscreen()
          e.preventDefault()
          break
      }
    })
  }
  
  bindHashChange() {
    if (this._boundHashChange) {
      return
    }
    this._boundHashChange = true
    const that = this
    window.addEventListener("hashchange", () => {
      that._checkHash()
    })
    this._checkHash()
  }

  _checkHash() {
    const hash = window.location.hash.replace("#", "")
    const num = parseInt(hash, 10)
    if (!hash) {
      return
    } else if (!isNaN(num)) {
      this.jump(num - 1)
    } else {
      this.jump("#" + hash)
    }
  }
  
  _updateHash() {
    if (this._current.id) {
      window.location.hash = "#" + this._current.id
    } else {
      window.location.hash = "#" + (this._currentIndex + 1)
    }
  }

  fullscreen() {
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen()
    } else if (document.body.webkitRequestFullscreen) {
      document.body.webkitRequestFullscreen()
    }
  }

  get size() {
    return this._parent.children.length
  }
  
  get currentIndex() {
    return this._currentIndex
  }

  get _currentIndex() {
    return Array.from(this._parent.children).indexOf(this._current)
  }

  _resolveElement(target) {
    if (target == undefined) {
      return this._current
    }
    if (typeof target === "number") {
      return this._resolveElement(this._parent.children[target])
    }
    if (typeof target === "string") {
      let matched = this._parent.querySelector(target)
      return this._resolveElement(matched)
    }
    if (Array.from(this._parent.children).indexOf(target) < 0) {
      return this._current
    }
    return target
  }
  
  _updateInterface() {
    const target = this._current
    const children = this._parent.children

    let i = 0

    for (; i < children.length; i++) {
      if (children[i] == target) break
      this.constructor._updateClassList(children[i], "before")
    }

    const currentN = i
    this.constructor._updateClassList(children[i], "current")
    i++

    for (; i < children.length; i++) {
      this.constructor._updateClassList(children[i], "after")
    }

    for (let j = 0; j < this._positionCallbacks.length; j++) {
      this._positionCallbacks[j](currentN)
    }
    
    this._updateNavigation()
  }
  
  static _updateClassList(element, mode) {
    switch (mode) {
    case "before":
      element.classList.remove("current")
      element.classList.remove("after")
      element.classList.add("before")
      break
    case "current":
      element.classList.remove("before")
      element.classList.remove("after")
      element.classList.add("current")
      break
    case "after":
      element.classList.remove("before")
      element.classList.remove("current")
      element.classList.add("after")
      break
    }
  } 

}


/* vim: set expandtab ts=2 sw=2: */
