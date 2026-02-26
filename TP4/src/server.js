const express = require('express');
const app = express();

const templates = require('./templates.js');
const utils = require('./utils.js');

app.use(express.static('../public')); 
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/emd'], (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    console.log(`GET ${req.url} ${d}`);
    const sortBy = req.query._sort || 'nome'; 
    const orderBy = req.query._order || 'asc';

    fetch(`http://localhost:3000/emds?_sort=${sortBy}&_order=${orderBy}`)
        .then(resp => resp.json())
        .then(emds => {
            const page = templates.emdListPage(emds, d);
            
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.status(200).send(page); 
        })
        .catch(erro => console.error("Erro no fetch:", erro));
});

app.get('/emd/registo', (req,res) => {
    const d = new Date().toISOString().substring(0, 16);
    console.log(`GET ${req.url} ${d}`);
    const registerPage = templates.emdRegisterPage(d);

    res.set('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(registerPage);
});


app.get('/emd/editar/:id', (req,res) => {
    const d = new Date().toISOString().substring(0, 16);
    console.log(`GET ${req.url} ${d}`);
    const id = req.params.id;

    fetch(`http://localhost:3000/emds/` + id)
        .then(resp => resp.json())
        .then(emd => {
            const editPage = templates.emdEditPage(emd,d)
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.status(200).send(editPage);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.status(404).send(`<p>Registo não encontrado</p>`);
        })
});

app.get('/emd/apagar/:id', (req,res) => {
    const d = new Date().toISOString().substring(0, 16);
    console.log(`GET ${req.url} ${d}`);
    const id = req.params.id;

    fetch(`http://localhost:3000/emds/` + id, {
        method: 'DELETE'
    })
    .then(resp => {
        res.status(302).redirect('/');
    })
    .catch(error => {
        res.status(502).send(`<p>Ocorreu um erro catastrófico: ${erro}</p>`);
    })
});

app.get('/emd/stats', (req,res) => {
    const d = new Date().toISOString().substring(0, 16);
    console.log(`GET ${req.url} ${d}`);

    fetch(`http://localhost:3000/emds`)
    .then(resp => resp.json())
    .then(emds => {
        const stats = utils.getStats(emds)
        const statPage = templates.emdStatPage(stats, d);
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(statPage);
    })
    .catch(error => {
        res.status(503).send(`<p>Ocorreu um erro catastrófico: ${error}</p>`);
    })
});

app.get('/emd/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    console.log(`GET ${req.url} ${d}`);

    const emdID = req.params.id;

    fetch(`http://localhost:3000/emds/${emdID}`)
        .then(resp => resp.json())
        .then(emd => {
            const page = templates.emdPage(emd, d);
            
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.status(200).send(page);
        })
        .catch(erro => {
            res.set('Content-Type', 'text/html; charset=utf-8');
            res.status(505).send(`
                <p>Não foi possível obter o registo do emd...</p>
                <p>${erro}</p>
                <address><a href="/">Voltar</a></address>
            `);
        });
});


app.post('/emd/registo', (req, res) => {
    const novoEMD = req.body;

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
            res.status(201).redirect('/');
        } else {
            res.status(500).send('<p>Erro ao gravar na base de dados.</p>');
        }
    })
    .catch(erro => {
        res.status(500).send(`<p>Ocorreu um erro catastrófico: ${erro}</p>`);
    });
});


app.post('/emd/editar/:id', (req, res) => {
    const id = req.params.id;
    const emdAtualizado = req.body;

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
            res.status(201).redirect(`/emd/${id}`);
        } else {
            res.status(500).send('<p>Erro ao atualizar na base de dados.</p>');
        }
    })
    .catch(erro => {
        res.status(500).send(`<p>Ocorreu um erro catastrófico: ${erro}</p>`);
    });
});

app.listen(7777, () => {
    console.log("Servidor Express à escuta na porta 7777...");
});