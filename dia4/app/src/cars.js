const url = 'http://localhost:3333/cars'
import { get, post, del } from './http'

const formCars = document.querySelector('[data-js="cars-form"]')
const listCars = document.querySelector('[data-js="cars-list"]')
const divMessageError = document.querySelector('[data-js="error"]')

function createImg(element) {
  const newImg = document.createElement('img')
  newImg.src = element.value.src
  newImg.alt = element.value.alt
  return newImg
}

function createDiv(element) {
  const newDiv = document.createElement('div')
  newDiv.style.backgroundColor = element.value
  return newDiv
}

function createDivOrImg(element) {
  return element.type === 'image'
    ? createImg(element)
    : createDiv(element)
}

async function handleDelete(event) {
  const button = event.target
  const plate = button.dataset.plate

  const result = await del(url, { plate })

  if (result.error) {
    divMessageError.classList.toggle('close')
    divMessageError.innerHTML = result.error
    console.log('Erro ao deletar veículo!', result.message)
    return
  }

  const tr = document.querySelector(`tr[data-plate="${plate}"]`)
  listCars.removeChild(tr)
  button.removeEventListener('click', handleDelete)

  const allTrs = listCars.querySelector('tr')
  if (!allTrs) {
    createNoCarRow()
  }
}

function noCarRow() {
  const tr = document.createElement('tr')
  tr.setAttribute('data-js', 'no-content')
  const data = [
    { value: '-' },
    { value: 'Nenhum' },
    { value: 'carro' },
    { value: 'encontrado' },
    { value: '-' },
  ]

  data.forEach((element) => {
    const newTd = document.createElement('td')
    newTd.innerHTML = element.value

    return tr.appendChild(newTd)
  })

  return listCars.appendChild(tr)
}

function createRow(data) {
  const elements = [
    { type: 'image', value: { src: data.image, alt: data.brandModel } },
    { type: 'text', value: data.brandModel },
    { type: 'text', value: data.year },
    { type: 'text', value: data.plate },
    { type: 'color', value: data.color }
  ]

  const plate = data.plate
  const newTr = document.createElement('tr')
  newTr.setAttribute('data-plate', plate)

  elements.forEach((element) => {
    const newTd = document.createElement('td')
    element.type === 'text'
      ? newTd.innerHTML = element.value
      : newTd.appendChild(createDivOrImg(element))

    return newTr.appendChild(newTd)
  })

  const tdButton = document.createElement('td')
  const button = document.createElement('button')
  button.textContent = 'Excluir'
  button.setAttribute('data-plate', data.plate)
  button.addEventListener('click', (event) => {
    handleDelete(event)
  }, false)
  tdButton.appendChild(button)

  newTr.appendChild(tdButton)

  listCars.appendChild(newTr)
}

formCars.addEventListener('submit', async (event) => {
  event.preventDefault()
  const image = event.target.elements.image

  const data = {
    image: event.target.elements.image.value,
    brandModel: event.target.elements['brand-model'].value,
    year: event.target.elements.year.value,
    plate: event.target.elements.plate.value,
    color: event.target.elements.color.value,
  }

  const result = await post(url, data)

  if (result.error) {
    divMessageError.classList.toggle('close')
    divMessageError.innerHTML = result.error
    console.log('Erro no cadastramento do novo veículo!', result.message)
    return
  }

  const noContent = document.querySelector('[data-js="no-content"]')
  if (noContent) {
    listCars.removeChild(noContent)
  }

  createRow(data)

  formCars.reset()
  image.focus()
}, false)

async function main() {
  const result = await get(url)

  if (result.error) {
    divMessageError.classList.toggle('close')
    divMessageError.innerHTML = result.error
    console.log('Erro ao buscar carros', result.message)
    return
  }

  if (result.length === 0) {
    noCarRow()
    return
  }

  result.forEach(createRow)
}

main()
