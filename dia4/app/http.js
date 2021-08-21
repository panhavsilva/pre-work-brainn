const request = (url, Option) => {
  return fetch(url, Option)
    .then((result) => result.json())
    .catch((err) => ({ erro: true, message: err.message }))
}

export const get = (url) => {
  return request(url)
}

export const post = (url, data) => {
  return request(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}
