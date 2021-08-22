const request = (url, Option) => {
  return fetch(url, Option)
    .then((result) => result.json())
    .catch((err) => ({ erro: true, message: err.message }))
}

const options = (method, data) => {
  const result = {
    method: method,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  }
  return result
}

export const get = (url) => request(url)
export const post = (url, data) => request(url, options('POST', data))
export const del = (url, data) => request(url, options('DELETE', data))
