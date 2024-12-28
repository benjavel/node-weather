const request = require('request')
const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.weatherstack.com/current?access_key=716f9bd0739f6f70e5ec29bb6e601645&query=' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect ot weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }

    })

}

module.exports = forecast