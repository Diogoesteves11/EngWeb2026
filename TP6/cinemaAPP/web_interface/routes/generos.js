var express = require('express');
var router = express.Router();

const API_BASE_URL = process.env.API_URL || "http://localhost:3000";

router.get('/', (req, res ,next) => {
  var d = new Date().toISOString().substring(0, 16);
  
  let queryString = req.url.split('?')[1] ? '?' + req.url.split('?')[1] : '';
  
  fetch(`${API_BASE_URL}/generos${queryString}`)
    .then(resp => {
      return resp.json();
    })
    .then(genres => {
      res.render('generos', { genres: genres, date: d });
    })
    .catch(error => {
      res.status(502).render('error', { error: error, date: d });
    });
});

module.exports = router;