const message = document.querySelector('#message')

document.querySelector('form').addEventListener('submit', (e) => {
   e.preventDefault()
   const location = e.target.elements.location.value.trim()

   message.textContent = 'Loading...'

   fetch(`/weather?city=${location}`)
      .then((response) => {
         return response.json()
      })
      .then((data) => {
         if (data.error) {
            message.textContent = data.error
         } else {
            message.textContent = data.city
         }
      })
})


