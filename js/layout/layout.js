function loadPartial(filePath, targetSelector, position = "beforeend") {
  fetch(filePath)
    .then((res) => {
      if (!res.ok) throw new Error(`Erro ao carregar ${filePath}`)
      return res.text()
    })
    .then((html) => {
      const target = document.querySelector(targetSelector)
      if (target) {
        target.insertAdjacentHTML(position, html)
      } else {
        console.warn(`Elemento alvo "${targetSelector}" não encontrado.`)
      }
    })
    .catch((err) => console.error(err))
}

// Carregar o header no topo do <body>
loadPartial("/partials/header.html", "body", "afterbegin")

// Carregar o footer no final do <body>
loadPartial("/partials/footer.html", "body", "beforeend")
