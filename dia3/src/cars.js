const formCars = document.querySelector('[data-js="cars-form"]')
const listCars = document.querySelector('[data-js="cars-list"]')

const createImg = (element) => {
  const newImg = document.createElement('img')
  newImg.width = 100
  newImg.src = element.value
  return newImg
}

const createDiv = (element) => {
  const newDiv = document.createElement('div')
  newDiv.style.width = '40px'
  newDiv.style.height = '40px'
  newDiv.style.borderRadius = '50%'
  newDiv.style.backgroundColor = element.value
  return newDiv
}

const createDivOrImg = (element) => {
  return element.type === 'image'
  ? createImg(element)
  : createDiv(element)
}

const createTd = (element) => {
  const newTd = document.createElement('td')
  element.type === 'text'
  ? newTd.innerHTML = element.value
  : newTd.appendChild(createDivOrImg(element))
  return newTd
}

const createRow = (elements) => {
  const newTr = document.createElement('tr')
  elements.forEach((element) => newTr.appendChild(createTd(element)))
  return newTr
}

formCars.addEventListener('submit', (event) => {
  event.preventDefault()
  const getElements = event.target.elements
  const elements = [
    { type: 'image', value: getElements.image.value},
    { type: 'text', value: getElements['brand-model'].value },
    { type: 'text', value: getElements.year.value },
    { type: 'text', value: getElements.plate.value },
    { type: 'color', value: getElements['color-car'].value },
  ]
  listCars.appendChild(createRow(elements))

  formCars.reset()
  getElements.image.focus()
}, false)
