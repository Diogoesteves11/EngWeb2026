var express = require('express');
var router = express.Router();

const API_BASE_URL = process.env.API_URL || "http://localhost:3000";

router.get(['/','/filmes'], function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  let param = req.query._sort || 'year';
  
  fetch(`${API_BASE_URL}/filmes?_sort=${param}`)
  .then(resp => resp.json())
  .then(data => {
    res.render('index', {films: data, date: d})
  })
  .catch(error => {
    res.status(502).render('error',{error: error, date: d});
  })
});

router.get('/filmes/:id', function(req, res, next){
  var d = new Date().toISOString().substring(0, 16);
  let filmID = req.params.id || '';
  
  fetch(`${API_BASE_URL}/filmes/${filmID}`)
  .then(resp => resp.json())
  .then(film => {
    let actorRequests = film.cast.map(actorID => {
      return fetch(`${API_BASE_URL}/atores/${actorID}`)
        .then(resp => resp.json());
    });

    return Promise.all(actorRequests)
      .then(atorsData => {
        let actorNameList = atorsData.map(ator => ator.name);
        res.render('film', { film: film, actors: actorNameList, date: d });
      });
  })
  .catch(error => {
    res.status(502).render('error', { error: error, date: d });
  });
});

module.exports = router;