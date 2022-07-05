try {

function injectCSS(url) {
  const e = document.createElement("link")
  e.setAttribute("href", url)
  e.setAttribute("rel", "stylesheet")
  e.setAttribute("type", "text/css")
  document.head.appendChild(e)
}

function injectJS(url) {
  const e = document.createElement("script")
  e.setAttribute("src", url)
  document.head.appendChild(e)
}

function injectElement(parent, pos, tag, classes, content) {
  const e = document.createElement(tag)
  e.setAttribute("class", classes)
  e.innerHTML = content ? content : ""
  if (pos == "start") {
    parent.prepend(e)
  }
  if (pos == "end") {
    parent.append(e)
  }
}

// TODO: rewrite

injectCSS("fdr.css")
injectCSS("theme.css")

injectJS("fdr.src.js")

injectElement(document.body, "start", "div", "overlay top bottom background")
injectElement(document.body, "end", "div", "overlay right", `
  <svg class="circle disabled" id="next" viewBox="0 0 32 32">
    <defs>
      <mask id="right-mask" x="0" y="0" width="32" height="32">
        <rect x="0" y="0" width="32" height="32" fill="#fff" />
        <text text-anchor="middle" x="17" y="27.6" font-weight="700" font-size="36">&gt;</text>
      </mask>
    </defs>
    <circle cx="16" cy="16" r="16" mask="url(#right-mask)" fill="#fff" />
  </svg>
`)
injectElement(document.body, "end", "div", "overlay left", `
  <svg class="circle disabled" id="previous" viewBox="0 0 32 32">
    <defs>
      <mask id="left-mask" x="0" y="0" width="32" height="32">
        <rect x="0" y="0" width="32" height="32" fill="#fff" />
        <text text-anchor="middle" x="15" y="27.6" font-weight="700" font-size="36">&lt;</text>
      </mask>
    </defs>
    <circle cx="16" cy="16" r="16" mask="url(#left-mask)" fill="#fff" />
  </svg>
`)

function startFdr() {
  var f = new Fdr()
  f.bindKeyboard()
  f.bindNext("#next")
  f.bindPrevious("#previous")
  f.bindPosition((position) => {
    document.body.scrollTo(0, 0)
    document.querySelector("#page-number").innerText = f.currentIndex + 1 + " of " + f.size
  })
  /*f.bindPosition((position) => {
    var pos = -position * 1024 * 1 + "px"
    document.querySelector(".background").style.transform = "translateX(" + pos + ")"
  })*/
  f.bindHashChange()
  window.addEventListener("keyup", (e) => {
    document.querySelector("body").classList.add("interface-hidden")
  })
  window.addEventListener("mousemove", (e) => {
    document.querySelector("body").classList.remove("interface-hidden")
  })
}

function tryStartFdr() {
  setTimeout(() => {
    try {
      startFdr()
      document.body.style.display = "block"
    } catch (e) {
      tryStartFdr()
    }
  }, 50)
}
tryStartFdr()

} catch (e) {
alert("Either update your browser or disable JavaScript.")
}
