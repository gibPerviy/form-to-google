const scriptURL = 'https://script.google.com/macros/s/AKfycbwjebMEQekLtmR9-mj1wfXwnzTJgH4fSmsgKiW5KRoMpJOv9xINxWRupE61889J6zRLUw/exec'
const form = document.forms['submit-to-google-sheet']
const inputs = document.querySelectorAll('.input')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  document.querySelector('.loader').style.display = 'inline-block'
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      console.log('Success!', response)
      document.querySelector('.success').style.display = 'block'
      document.querySelector('.loader').style.display = 'none'
      inputs.forEach((input) => {
        input.value = ''
      })
      window.location.href = 'accepted.html'
    })
    .catch((error) => {
      console.error('Error!', error.message)
      document.querySelector('.loader').style.display = 'none'
      document.querySelector('.error').style.display = 'block'
    })
})
