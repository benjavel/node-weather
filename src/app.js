const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine', 'hbs')

app.set('views', path.join(__dirname, '../templates/views'))
app.use(express.static(path.join(__dirname, '../public')))

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Benjamin Velazquez',
        res: res
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Benjamin Velazquez',
        title: 'Help',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Benjamin Velazquez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }
    geocode(req.query.address, (error, { label, longitude, latitude } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, { temp, feelslike, description } = {}) => {
            if (error) {
                return re.send({
                    error
                })
            }
            res.send({
                forecast: description,
                temp,
                feelslike,
                label,
                address: req.query.address
            })


        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Benjamin Velazquez',
        title: 'Error 404',
        errorMsg: 'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Benjamin Velazquez',
        title: 'Error 404',
        errorMsg: 'Page not found'
    })
})

module.exports = app