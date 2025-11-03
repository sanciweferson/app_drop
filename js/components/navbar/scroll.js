// ==============================
// Navbar Scroll Suave + Active Link
// ==============================
export function initNavbarScroll() {
  const navbar = document.querySelector(".nav__bar")
  const links = document.querySelectorAll(".menu__link")
  const navbarHeight = navbar.offsetHeight
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    // ==============================
    // Adiciona classe .scrolled quando rolar
    // ==============================
    if (currentScroll > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // ==============================
    // Esconder / mostrar navbar ao rolar
    // ==============================
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.add("hide")
      navbar.classList.remove("show")
    } else {
      navbar.classList.add("show")
      navbar.classList.remove("hide")
    }
    lastScroll = currentScroll

    // ==============================
    // Active link + underline suave
    // ==============================
    links.forEach((link) => {
      const targetId = link.getAttribute("href")
      if (!targetId.startsWith("#")) return

      const section = document.querySelector(targetId)
      if (!section) return

      const top = section.offsetTop - navbarHeight
      const bottom = top + section.offsetHeight

      if (currentScroll >= top && currentScroll < bottom) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  })
}
