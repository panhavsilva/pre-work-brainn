const inputName = document.querySelector('[data-js="name"]')

inputName.addEventListener('input', (event) => {
  const regexFirstLetter = /(\b[a-z](?!\s))/g;
  const regexLowerCaseD = /(\bD)[a|o|e]s?\s/g;
  const upperCaseFirstletter = (letter) => { return letter.toUpperCase() }
  const lowerCaseFirstletter = (letter) => { return letter.toLowerCase() }
  const newValue = String(event.target.value)
  .replace(regexFirstLetter, upperCaseFirstletter)
  .replace(regexLowerCaseD, lowerCaseFirstletter)

  event.target.value = newValue
}, false)

const colors = [
  { name: 'Preto', color: '#000000' },
  { name: 'Branco', color: '#ffffff' },
  { name: 'Amarelo', color: '#ffff00' },
  { name: 'Vermelho', color: '#ff0000' },
  { name: 'Rosa', color: '#ff1493' },
]
const form = document.querySelector('[data-js="form"]')
const newSelect = document.createElement('select')
form.insertAdjacentHTML(
  'afterend',
  '<div data-js="div-colors" class="div-colors"></div>'
)
const divColors = document.querySelector('[data-js=div-colors]')

colors.forEach((color) => {
  const newOption = document.createElement('option')
  newOption.value = color.color
  newOption.text = color.name
  newOption.setAttribute("data-js", "color")
  newSelect.appendChild(newOption)
})

newSelect.addEventListener('change', (event) => {
  divColors.innerHTML = ''

  const colorsSelected = [...event.target.selectedOptions].map((color) => color.value)
  colorsSelected.map((color) => {
    const newDiv = document.createElement('div')
    newDiv.style.backgroundColor = color
    newDiv.className = 'div-color'
    divColors.appendChild(newDiv)
  })
}, false)

newSelect.setAttribute("multiple", "")
newSelect.setAttribute("data-js", "select-colors")
newSelect.className = 'select-colors'
form.appendChild(newSelect)
