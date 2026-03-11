var express = require('express');
var router = express.Router();

const API_BASE_URL = process.env.API_URL || "http://localhost:3000";

router.get('/', (req, res ,next) => {
  var d = new Date().toISOString().substring(0, 16);
  let param = req.query._sort ? '?_sort=' + req.query._sort : '';
  
  fetch(`${API_BASE_URL}/atores${param}`)
    .then(resp => resp.json())
    .then(actors => {
      res.render('actors', { actors: actors, date: d });
    })
    .catch(error => {
      res.status(502).render('error', { error: error, date: d });
    });
});

router.get('/:id', (req, res, next) => {
  var d = new Date().toISOString().substring(0, 16);
  let actorID = req.params.id || '';

  fetch(`${API_BASE_URL}/atores/${actorID}`)
  .then(resp => resp.json())
  .then(actor => {
    let filmRequests = actor.films.map(filmID => {

      return fetch(`${API_BASE_URL}/filmes/${filmID}`)
          .then(resp => resp.json())
    })

    return Promise.all(filmRequests)
          .then(filmData => {
            let filmNameList = filmData.map(film => film.title);
            res.render('actor', { actor: actor, films: filmNameList, date: d });
          })
  })
  .catch(error => {
    res.status(502).render('error', { error: error, date: d });
  });
});

module.exports = router;