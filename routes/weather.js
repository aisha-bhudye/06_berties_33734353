const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
  const city = req.query.city || 'London';

  const apiKey = process.env.OWM_API_KEY;

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  request(url, (err, response, body) => {
    if (err) {
      return res.render('weather', { error: 'Network error', weather: null, queryCity: city });
    }

    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      return res.render('weather', { error: 'Invalid JSON response', weather: null, queryCity: city });
    }

    if (data.cod !== 200) {
      return res.render('weather', { error: data.message, weather: null, queryCity: city });
    }

    const weather = {
      city: data.name,
      description: data.weather[0].description,
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed
    };

    res.render('weather', { weather, error: null, queryCity: city });
  });
});

module.exports = router;
