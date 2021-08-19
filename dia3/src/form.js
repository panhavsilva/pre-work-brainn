const form = document.querySelector('[data-js="form"]')
const inputName = document.querySelector('[data-js="name"]')
const newSelect = document.createElement('select')

inputName.addEventListener('input', (event) => {
  const regexFirstLetter = /(\b[a-z](?!\s))/g;
  const regexLowerCaseD = /(\bD)[a|o|e]s?\s/g;
  const upperCaseFirstletter = (letter) => { return letter.toUpperCase()}
  const lowerCaseFirstletter = (letter) => { return letter.toLowerCase()}
  const newValue = String(event.target.value)
  .replace(regexFirstLetter, upperCaseFirstletter)
  .replace(regexLowerCaseD, lowerCaseFirstletter)

  event.target.value = newValue
}, false)

newSelect.setAttribute("data-js", "select-colors")
newSelect.setAttribute("multiple", "")
newSelect.className = 'select-colors'
form.appendChild(newSelect)

const selectColor = document.querySelector('[data-js="select-colors"]')
const colors = [
  { name: 'Preto', color: 'black'},
  { name: 'Branco', color: 'white'},
  { name: 'Amarelo', color: 'yellow'},
  { name: 'Vermelho', color: 'red' },
  { name: 'Rosa', color: 'pink' },
]
colors.forEach((color) => {
  const newOption = document.createElement('option')
  newOption.value = color.color
  newOption.text = color.name
  newOption.setAttribute("data-js", "color")
  selectColor.appendChild(newOption)
})

selectColor.insertAdjacentHTML(
  'afterend',
  '<div data-js="div-colors" class="div-colors"></div>'
)

const divColors = document.querySelector('[data-js=div-colors]')
colors.forEach((color) => {
  const newDiv = document.createElement('div')
  newDiv.className = `div-color ${color.color}`
  newDiv.setAttribute("data-js", `${color.color}`)
  divColors.appendChild(newDiv)
})

selectColor.addEventListener('change', (event) => {
  const colorsSelected = [...event.target.selectedOptions].map((color) => color.value)
  const test = colorsSelected.map((color) => {
    const divColor = document.querySelector(`[data-js="${color}"]`)
    divColor.toggleAttribute('hidden')
  })
}, false)
