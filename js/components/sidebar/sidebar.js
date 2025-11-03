export class Sidebar {
  constructor(
    toggleId = "menu__toggle",
    sideId = "mobile__side",
    breakpoint = 768
  ) {
    this.menuToggleButton = document.getElementById(toggleId)
    this.sideMenu = document.getElementById(sideId)
    this.breakpoint = breakpoint
  }

  open() {
    if (!this.menuToggleButton || !this.sideMenu) return

    this.sideMenu.classList.add("open")
    this.menuToggleButton.innerHTML = "&times;"
    this.menuToggleButton.setAttribute("aria-expanded", "true")
    this.sideMenu.setAttribute("aria-hidden", "false")
    localStorage.setItem("menuOpen", "true")
  }

  close() {
    if (!this.menuToggleButton || !this.sideMenu) return

    this.sideMenu.classList.remove("open")
    this.menuToggleButton.innerHTML = "&#9776;"
    this.menuToggleButton.setAttribute("aria-expanded", "false")
    this.sideMenu.setAttribute("aria-hidden", "true")
    localStorage.setItem("menuOpen", "false")
  }

  toggle() {
    if (!this.sideMenu) return
    this.sideMenu.classList.contains("open") ? this.close() : this.open()
  }

  setupToggle() {
    if (!this.menuToggleButton || !this.sideMenu) return

    this.menuToggleButton.addEventListener("click", () => this.toggle())
  }

  restoreState() {
    if (!this.sideMenu) return

    setTimeout(() => {
      const saved = localStorage.getItem("menuOpen") === "true"
      saved ? this.open() : this.close()
    }, 50)
  }

  handleResize() {
    window.addEventListener("resize", () => {
      if (!this.sideMenu) return

      if (
        window.innerWidth > this.breakpoint &&
        this.sideMenu.classList.contains("open")
      ) {
        this.close()
      }
    })
  }

  handleLinkClicks() {
    if (!this.sideMenu) return

    const links = this.sideMenu.querySelectorAll("a[href]")
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href")
        this.close()

        if (href.startsWith("#")) {
          event.preventDefault()
          const target = document.querySelector(href)
          if (target)
            setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 200)
        }
      })
    })
  }

  init() {
    const wait = setInterval(() => {
      if (this.menuToggleButton && this.sideMenu) {
        this.setupToggle()
        this.restoreState()
        this.handleResize()
        this.handleLinkClicks()

        clearInterval(wait)
      }
    }, 50)
  }
}
