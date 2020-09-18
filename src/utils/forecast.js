const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=851d24bff423529d418d8f8545403182&query=${latitude},${longitude}&units=f`
    
    request({ url, json: true }, (error, { body }) => {
        if (error) { 
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } 
        else {
            const current = body.current
            const temp = current.temperature
            const feelsLike = current.feelslike
            const weather = current.weather_descriptions[0]
            const humidity = current.humidity
            const cloudCover = current.cloudcover
            let forecastString = `Currently it is ${weather} and ${temp} degrees.`
            forecastString += ` It feels like ${feelsLike} degrees.`
            forecastString += ` The humidity is ${humidity}%.`
            forecastString += ` The cloud cover is ${cloudCover}%.`
            callback(undefined, forecastString)        
        }
    })
}

module.exports = forecast