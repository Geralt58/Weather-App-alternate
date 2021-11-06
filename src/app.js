const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./weather')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather App',
      name: 'Geralt58'
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      name: 'Geralt58'
   })
})

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      help: 'Documentation',
      name: 'Geralt58'
   })
})

app.get('/weather', (req, res) => {
   if (!req.query.city) {
      return res.send({
         error: 'you must provide a city'
      })
   }

   
   forecast(req.query.city, (error, forecastData) => {
      if (error) {
         return res.send({
            error
         })
      }
      res.send({
         city: forecastData
      })
   })
})

app.get('/products', (req, res) => {
   if (!req.query.search) {
      return res.send({
         error: 'you must provide a search term  '
      })
   }

   res.send({
      products: []
   })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: 404,
      name: 'Geralt58',
      errorMessage: 'Help article not found'
   })
})

app.get('*', (req, res) => {
   res.render('404', {
      title: 404,
      name: 'Geralt58',
      errorMessage: 'Page not found'
   })
})

app.listen(port, () => {
   console.log('server is up')
})
