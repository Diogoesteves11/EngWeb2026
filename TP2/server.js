const http = require('http');
const axios = require('axios');


var repairs_html = `
<!DOCTYPE html>
<html>
    <head>
        <title>Página de Reparações</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <table border="1">
            <tr><td>NIF</td><td>Nome</td><td>Data</td><td>Viatura</td><td>Nº Intervenções</td></tr>
`

var interventions_html = `
<!DOCTYPE html>
<html>
    <head>
        <title>Página de Intervenções</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <table border="1">
            <tr><td>Código</td><td>Nome</td><td>Descrição</td><td>Nº Intervenções</td></tr>
`

var vehicles_html = `
<!DOCTYPE html>
<html>
    <head>
        <title>Página de Viaturas</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <table border="1">
            <tr><td>Marca</td><td>Contagem de Intervenções</td></tr>
`


function createKey(brand, model){
    return (brand + " " + model);
}


http.createServer((req,res) => {
    switch (req.url){
        case "/reparacoes":{
            axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                let rep_html = ""
                let data = resp.data
                const orderedDictByName = Object.values(data).sort((a, b) => {
                    return a.nome.localeCompare(b.nome);
                });
                for (const repair of orderedDictByName) {
                    rep_html += `<tr><td>${repair.nif}</td><td>${repair.nome}</td><td>${repair.data}</td><td>${repair.viatura.marca} ${repair.viatura.modelo} (${repair.viatura.matricula})</td><td>${repair.nr_intervencoes}</td></tr>`;
                }
                    
                var footer = "</table></body></html>";
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(repairs_html + rep_html + footer);
            })
            .catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html, charset=utf-8'});
                res.end("<pre>" + JSON.stringify(error) + "</pre>");
            });
            break;
        }
       case "/intervencoes": {
            axios.get('http://localhost:3000/reparacoes')
                .then(resp => {
                    let intv_html = "";
                    let data = resp.data;

                    const interventions = {};
                    
                    for (const repair of Object.values(data)) {
                        for (const interv of repair.intervencoes) {
                            const codigo = interv.codigo; 
                        
                            if (codigo in interventions) {
                                interventions[codigo].interventionNum++;
                            } else {
                                interventions[codigo] = {
                                    name: interv.nome,           
                                    description: interv.descricao,
                                    interventionNum: 1
                                };
                            }
                        }
                    }
                    
                    const listaOrdenada = Object.entries(interventions);
                    listaOrdenada.sort((a, b) => {
                        return a[0].localeCompare(b[0]);
                    });

                    for (const [code, intervData] of listaOrdenada) {
                        intv_html += `<tr>
                            <td>${code}</td>
                            <td>${intervData.name}</td>
                            <td>${intervData.description}</td>
                            <td>${intervData.interventionNum}</td>
                        </tr>`;
                    }
                
                    const footer = "</table></body></html>";

                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(interventions_html + intv_html + footer);
                })
                .catch(error => {
                    res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end("<pre>" + JSON.stringify(error) + "</pre>");
                });
            break;
        }
        case "/viaturas":{
            let v_html = "";
            axios.get('http://localhost:3000/reparacoes')
                .then(resp => {
                    let data = resp.data;
                    const vehicles = {};

                    for (const repair of Object.values(data)){
                        const key = repair.viatura.marca;
                        (key in vehicles)? vehicles[key] += repair.nr_intervencoes : vehicles[key] = repair.nr_intervencoes;
                    }

                    const orderedVehicles = Object.entries(vehicles).sort((a,b) => {
                        return a[0].localeCompare(b[0]);
                    })

                    for(const [key, count] of orderedVehicles){
                        v_html += `<tr>
                            <td>${key}</td>
                            <td>${count}</td>
                        </tr>`;
                    }
                    const footer = "</table></body></html>";

                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(vehicles_html + v_html + footer);
                })
                .catch(error => {
                    res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end("<pre>" + JSON.stringify(error) + "</pre>");
                });
            break;
        }
        default:{
            res.writeHead(404, {'Content-Type': 'text/html, charset=utf-8'});
            res.end("<p>" + "404: Página não encontrada" + "</p>");
            break;
        }
    }
    console.log("Recebido Pedido: " + JSON.stringify(req.method) + " " + req.url + " " + res.statusCode);
}).listen(7777);


console.log("Servidor à escuta na porta 7777...");