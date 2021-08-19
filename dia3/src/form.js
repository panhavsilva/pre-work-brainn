const inputName = document.querySelector('[data-js="name"]')

inputName.addEventListener('input', (event) => {
  const regexFirstLetter = /(\b[a-z](?!\s))/g;
  const regexLowerCaseD = /(\bD)[a|o]s?\s/g;
  const upperCaseFirstletter = (letter) => { return letter.toUpperCase()}
  const lowerCaseFirstletter = (letter) => { return letter.toLowerCase()}
  const newValue = String(event.target.value)
    .replace(regexFirstLetter, upperCaseFirstletter)
    .replace(regexLowerCaseD, lowerCaseFirstletter)

  event.target.value = newValue
}, false)

