const carsForm = document.querySelector('[data-js="cars-form"]')
const carsList = document.querySelector('[data-js="cars-list"]')
import { get, post, del } from './http'
const url = 'http://localhost:3333/cars'

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName]
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
}

function createImage(data) {
  const td = document.createElement('td')
  const img = document.createElement('img')
  img.src = data.src
  img.alt = data.alt
  td.appendChild(img)
  return td
}

function createText(value) {
  const td = document.createElement('td')
  td.textContent = value
  return td
}

function createColor(value) {
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.background = value
  td.appendChild(div)
  return td
}

carsForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const getElement = getFormElement(e)
  const imageInput = getElement('image')

  const data = {
    image: getElement('image').value,
    brandModel: getElement('brand-model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value,
  }

  const result = await post(url, data)

  if (result.error) {
    console.log('deu erro na hora de cadastrar', result.message)
    return
  }

  const noContent = document.querySelector('[data-js="no-content"]')
  if (noContent) {
    carsList.removeChild(noContent)
  }

  createRow(data)

  carsForm.reset()
  imageInput.focus()
})

function createRow(data) {
  const elements = [
    { type: 'image', value: { src: data.image, alt: data.brandModel } },
    { type: 'text', value: data.brandModel },
    { type: 'text', value: data.year },
    { type: 'text', value: data.plate },
    { type: 'color', value: data.color }
  ]

  const tr = document.createElement('tr')
  tr.setAttribute('data-plate', data.plate)

  elements.forEach(element => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })

  const td = document.createElement('td')
  const button = document.createElement('button')
  button.textContent = 'Excluir'
  button.setAttribute('data-plate', data.plate)

  button.addEventListener('click', handleDelete)
  td.appendChild(button)

  tr.appendChild(td)

  carsList.appendChild(tr)
}

async function handleDelete(e) {
  const button = e.target
  const plate = button.dataset.plate

  const result = await del(url, { plate })

  if (result.error) {
    console.log('erro ao deletar', result.message)
    return
  }

  const tr = document.querySelector(`tr[data-plate="${plate}"]`)
  carsList.removeChild(tr)
  button.removeEventListener('click', handleDelete)

  const allTrs = carsList.querySelector('tr')
  if (!allTrs) {
    createNoCarRow()
  }
}

function createNoCarRow() {
  const tr = document.createElement('tr')
  const td = document.createElement('td')
  const thsLength = document.querySelectorAll('table th').length
  td.setAttribute('colspan', thsLength)
  td.textContent = 'Nenhum carro encontrado'

  tr.setAttribute('data-js', 'no-content')
  tr.appendChild(td)
  carsList.appendChild(tr)
}

async function main() {
  const result = await get(url)

  if (result.error) {
    console.log('Erro ao buscar carros', result.message)
    return
  }

  if (result.length === 0) {
    createNoCarRow()
    return
  }

  result.forEach(createRow)
}

main()
