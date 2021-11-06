const request = require('postman-request')

const forecast = (city, callback) => {
   const url =
      'http://api.weatherstack.com/current?access_key=59a42caf06552eb54807a2e8aa012163&query=' +
      city

   request({ url, json: true }, (error, { body }) => {
      if (error) {
         callback('unable to connect to weather services', undefined)
      } else if (body.error) {
         callback('unable to find location', undefined)
      } else {
         // console.log(body)
         callback(
            undefined,
            `It is currently ${body.current.temperature}°C in ${body.location.name}, ${body.location.region}, ${body.location.country}. There is ${body.current.precip}% chance of rain.`
         )
      }
   })
}

module.exports = forecast 
