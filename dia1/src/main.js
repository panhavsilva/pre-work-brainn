import './style.css'

const app = document.querySelector('[data-js="app"]')
app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

const linkMesage = {
  initial: 'Clique aqui para ocultar o conteúdo!',
  close: (link, app) => {
    app.style.opacity = 0;
    return link.innerHTML = 'Clique aqui para <b>mostrar</b> o conteúdo!'
  },
  open: (link, app) => {
    app.style.opacity = 1;
    return link.innerHTML = 'Clique aqui para <b>ocultar</b> o conteúdo!'
  },
}

const link = document.querySelector('[data-js="link"]')
link.addEventListener('click', (event) => {
  event.preventDefault()

  return link.innerText === linkMesage.initial
    ? linkMesage.close(link, app)
    : linkMesage.open(link, app)
}, false)
