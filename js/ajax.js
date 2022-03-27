function requres (option = {}, cb) {
  const { method, url, header, data } = option
  Object.keys(header).forEach(key => {
    xhr.setRequestHeader(key, header[key])
  })
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 200) {
      return x
    }
  }
  xhr.onload = (e) => {
    cb(e.target.response)
  }
  xhr.send(data)
}