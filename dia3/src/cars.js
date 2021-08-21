const formCars = document.querySelector('[data-js="cars-form"]')
const listCars = document.querySelector('[data-js="cars-list"]')

const createTd = (event, item) => {
  const newTd = document.createElement('td')
  newTd.innerHTML = String(event.target.elements[item].value)
  return newTd
}

const createTr = (event) => {
  const newTr = document.createElement('tr')
  newTr.appendChild(createTd(event, 'image'))
  newTr.appendChild(createTd(event, 'brand-model'))
  newTr.appendChild(createTd(event, 'year'))
  newTr.appendChild(createTd(event, 'plate'))
  newTr.appendChild(createTd(event, 'color-car'))
  return newTr
}

formCars.addEventListener('submit', (event) => {
  event.preventDefault()

  listCars.appendChild(createTr(event))

  formCars.reset()
  event.target.elements.image.focus()
}, false)
