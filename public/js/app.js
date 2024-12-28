const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent = ''
    msgTwo.textContent = 'Loading...'
    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                msgTwo.textContent = data.error
                return console.log(data.error)
            }
            
            msgOne.textContent = data.label
            msgTwo.innerHTML = data.forecast + '<br>' +data.temp + '°C, feelslike ' + data.feelslike + '°C'
        })
    })
    
})