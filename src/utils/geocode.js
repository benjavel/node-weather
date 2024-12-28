const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.positionstack.com/v1/forward?access_key=079e49c261cc4a548619abe227135790&query=' + encodeURIComponent(address) + '&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.error || body.data.length === 0) {
            callback('No matching results. Enter a valid location', undefined)
        } else {
            callback(undefined, { 
                latitude: body.data[0].latitude, 
                longitude: body.data[0].longitude, 
                label: body.data[0].label 
            })
        }

    })
}

module.exports = geocode