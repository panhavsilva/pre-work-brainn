const carsForm = document.querySelector('[data-js="cars-form"]')
const carsList = document.querySelector('[data-js="cars-list"]')
const url = 'http://localhost:3333/cars'

const carUndefined ={
  image: '-',
  brandModel: 'Nenhum',
  year: 'carro',
  plate: 'encontrado!',
  color: '-',
}

async function listCars(url) {
  const result = await fetch(url)
    .then((result) => result.json())
    .catch((err) => ({ erro: true, message: err.message }))

  if (result.erro) {
    console.log('Erro ao listar os carros!', result.message)
    return
  }

  const carRemove = [...document.querySelectorAll('[data-js="car"]')]
  if (carRemove) {
    carRemove.map((car) => carsList.removeChild(car))
  }

  return result.length === 0
    ? createRow(carUndefined)
    : result.forEach(element => createRow(element));
}

async function createCar (url, item) {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(item)
  })

  return result
}

const createItem = (value) => {
  const newTd = document.createElement('td')
  newTd.innerHTML = value
  return newTd
}

const createRow = (value) => {
  const newTr = document.createElement('tr')
  newTr.appendChild(createItem(value.image))
  newTr.appendChild(createItem(value.brandModel))
  newTr.appendChild(createItem(value.year))
  newTr.appendChild(createItem(value.plate))
  newTr.appendChild(createItem(value.color))
  newTr.setAttribute('data-js', 'car')
  return carsList.appendChild(newTr)
}

carsForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const car = {
    image: event.target.elements.image.value,
    brandModel: event.target.elements.model.value,
    year: Number(event.target.elements.year.value),
    plate: event.target.elements.plate.value,
    color: event.target.elements.color.value,
  }

  createCar(url, car)
  listCars(url)

  carsForm.reset()
  event.target.elements.image.focus()
}, false)

window.addEventListener('load', () => {
 return listCars(url)
}, false)
