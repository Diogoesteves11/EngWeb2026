var express = require('express');
var router = express.Router();

var utils = require('../public/javascripts/utils.js');

/* GET home page / listar EMDs. */
router.get(['/', '/emd'], function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    var sortBy = req.query._sort || 'nome'; 
    var orderBy = req.query._order || 'asc';

    fetch(`http://localhost:3000/emds?_sort=${sortBy}&_order=${orderBy}`)
        .then(resp => resp.json())
        .then(emds => {
            res.render('index', { list: emds, date: d });
        })
        .catch(erro => {
            res.render('error', { error: erro, message: "Erro ao obter a lista de EMDs" });
        });
});

/* GET página de registo  */
router.get('/emd/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    res.render('emdRegisterForm', { date: d });
});

/* GET página de estatísticas */
router.get('/emd/stats', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);

    fetch(`http://localhost:3000/emds`)
        .then(resp => resp.json())
        .then(emds => {
            var stats = utils.getStats(emds);
            res.render('statPage', { stats: stats, date: d });
        })
        .catch(erro => {
            res.render('error', { error: erro, message: "Erro ao calcular estatísticas" });
        });
});

/* GET página de edição */
router.get('/emd/editar/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    var id = req.params.id;

    fetch(`http://localhost:3000/emds/${id}`)
        .then(resp => resp.json())
        .then(emd => {
            res.render('emdEditForm', { emd: emd, date: d });
        })
        .catch(erro => {
            res.render('error', { error: erro, message: "Registo não encontrado para edição" });
        });
});

/* GET apagar EMD */
router.get('/emd/apagar/:id', function(req, res, next) {
    var id = req.params.id;

    fetch(`http://localhost:3000/emds/${id}`, {
        method: 'DELETE'
    })
    .then(resp => {
        res.redirect('/');
    })
    .catch(erro => {
        res.render('error', { error: erro, message: "Erro ao apagar o registo" });
    });
});

/* GET página individual de um EMD */
router.get('/emd/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    var id = req.params.id;

    fetch(`http://localhost:3000/emds/${id}`)
        .then(resp => resp.json())
        .then(emd => {
            res.render('emd', { emd: emd, date: d });
        })
        .catch(erro => {
            res.render('error', { error: erro, message: "Não foi possível obter o registo do EMD" });
        });
});

/* POST criar novo EMD */
router.post('/emd', function(req, res, next) {
    var novoEMD = req.body;

    novoEMD.idade = parseInt(novoEMD.idade);
    novoEMD.federado = (novoEMD.federado === 'true');
    novoEMD.resultado = (novoEMD.resultado === 'true');

    fetch('http://localhost:3000/emds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoEMD) 
    })
    .then(resp => {
        if (resp.ok) {
            res.redirect('/');
        } else {
            res.render('error', { error: new Error('Erro na API'), message: "Erro ao gravar na base de dados" });
        }
    })
    .catch(erro => {
        res.render('error', { error: erro, message: "Erro catastrófico ao gravar na base de dados" });
    });
});

/* POST atualizar EMD existente */
router.post('/emd/:id', function(req, res, next) {
    var id = req.params.id;
    var emdAtualizado = req.body;

    emdAtualizado.idade = parseInt(emdAtualizado.idade);
    emdAtualizado.federado = (emdAtualizado.federado === 'true');
    emdAtualizado.resultado = (emdAtualizado.resultado === 'true');

    fetch(`http://localhost:3000/emds/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emdAtualizado)
    })
    .then(resp => {
        if (resp.ok) {
            res.redirect(`/emd/${id}`);
        } else {
            res.render('error', { error: new Error('Erro na API'), message: "Erro ao atualizar na base de dados" });
        }
    })
    .catch(erro => {
        res.render('error', { error: erro, message: "Erro catastrófico ao atualizar na base de dados" });
    });
});

module.exports = router;