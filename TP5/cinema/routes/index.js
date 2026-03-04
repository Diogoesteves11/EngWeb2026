var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(['/','/filmes'], function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  let param = req.query._sort || 'year';
  fetch('http://localhost:3000/filmes?_sort=' + param)
  .then(resp => resp.json())
  .then(data => {
    res.render('index', {films: data, date: d})
  })
  .catch(error => {
    res.status(502).render('error',{error: error, date: d});
  })
});

/* GET página de filme */
router.get('/filmes/:id', function(req, res, next){
  var d = new Date().toISOString().substring(0, 16);
  let filmID = req.params.id || '';
  
  fetch('http://localhost:3000/filmes/' + filmID)
  .then(resp => resp.json())
  .then(film => {
    let actorRequests = film.cast.map(actorID => {
      return fetch('http://localhost:3000/atores/' + actorID)
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


router.get(['/atores'], (req, res ,next) => {
  var d = new Date().toISOString().substring(0, 16);
  let param = req.query._sort ? '?_sort=' + req.query._sort : '';
  fetch('http://localhost:3000/atores' + param)
    .then(resp => resp.json())
    .then(actors => {
      res.render('actors', { actors: actors, date: d });
    })
    .catch(error => {
      res.status(502).render('error', { error: error, date: d });
    });
});


router.get('/atores/:id', (req, res, next) => {
  var d = new Date().toISOString().substring(0, 16);
  let actorID = req.params.id || '';

  fetch('http://localhost:3000/atores/' + actorID)
  .then(resp => resp.json())
  .then(actor => {
    let filmRequests = actor.films.map(filmID => {
      return fetch('http://localhost:3000/filmes/' + filmID)
          .then(resp => resp.json())
    })

    return Promise.all(filmRequests)
          .then(filmData => {
            let filmNameList = filmData.map(film => film.title);
            res.render('actor', {actor: actor, films: filmNameList});
          })
  })
  .catch(error => {
    res.status(502).render('error', { error: error, date: d });
  });
});

module.exports = router;