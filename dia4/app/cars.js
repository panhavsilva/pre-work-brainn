const carsForm = document.querySelector('[data-js="cars-form"]')
const carsList = document.querySelector('[data-js="cars-list"]')
import {get, post} from './http'
const url = 'http://localhost:3333/cars'

const carUndefined ={
  image: '-',
  brandModel: 'Nenhum',
  year: 'carro',
  plate: 'encontrado!',
  color: '-',
}

async function listCars(url) {
  const result = await get(url)

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
    : result.forEach((element) => createRow(element));
}

async function createCar (url, data) {
  const result = await post(url, data)
  if (result.erro) {
    console.log('Erro ao listar os carros!', result.message)
    return
  }
  return result
}

const createItem = (value) => {
  const newTd = document.createElement('td')
  newTd.innerHTML = value
  return newTd
}

function createButton (plate) {
  const newTd = document.createElement('td')
  const newButton = document.createElement('button')
  newButton.setAttribute('data-js', plate)
  newButton.textContent = 'Excluir'
  newButton.addEventListener('click', (event) => {
    const tr = document.querySelector(`tr[data-plate="${plate}"]`)
    carsList.removeChild(tr)
  })
  newTd.appendChild(newButton)
  return newTd
}

const createRow = (value) => {
  const newTr = document.createElement('tr')
  newTr.setAttribute('data-plate', value.plate)
  newTr.setAttribute('data-js', 'car')

  newTr.appendChild(createItem(value.image))
  newTr.appendChild(createItem(value.brandModel))
  newTr.appendChild(createItem(value.year))
  newTr.appendChild(createItem(value.plate))
  newTr.appendChild(createItem(value.color))

  newTr.appendChild(createButton(value.plate))

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
