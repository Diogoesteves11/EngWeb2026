const http = require('http');
const axios = require('axios');
const utils = require('./utils.js')

var webServer = http.createServer(async function (req,res) {
    utils.logDate(req);
    if(req.method == 'GET'){
        if(req.url == '/alunos'){
            try{
                var students = await utils.getStudents();
                var rows = Object.values(students).map(s => {
                    return `
                    <tr>
                        <td>${s.nome} (${s.id})</td>
                        <td>${s.dataNasc}</td>
                        <td>${utils.link("/cursos/" + s.curso, s.curso)}</td>
                        <td>${s.anoCurso}</td>
                        <td>${utils.link("/instrumentos/" + encodeURIComponent(s.instrumento), s.instrumento)}</td>
                    </tr>
                    `
                }).join("");
                var body = utils.card("Lista de Alunos", `
                    <table class="w3-table w3-striped w3-bordered w3-hoverable">
                        <tr class="w3-light-grey">
                            <th>Nome (ID)</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano</th>
                            <th>Instrumento</th>
                        </tr>
                        ${rows}
                    </table>
                    ${utils.botaoVoltar()}
                    `);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(utils.createPage("Lista de Alunos", body));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>Erro ao carregar Alunos: ${error}.</p>`);
            }
        } else if(req.url == '/cursos'){
            try{
                var courses = await utils.getCourses();
                var rows = Object.values(courses).map(c => {
                    return `
                    <tr>
                        <td>${c.id}</td>
                        <td>${c.designacao}</td>
                        <td>${c.duracao}</td>
                        <td>${utils.link("/instrumentos/" + encodeURIComponent(c.instrumento["#text"]), c.instrumento["#text"])}</td>
                    </tr>
                    `
                }).join("");
                var body = utils.card("Lista de Cursos", `
                    <table class="w3-table w3-striped w3-bordered w3-hoverable">
                        <tr class="w3-light-grey">
                            <th>ID</th>
                            <th>Designação</th>
                            <th>Duração</th>
                            <th>Instrumento</th>
                        </tr>
                        ${rows}
                    </table> 
                    ${utils.botaoVoltar()}
                    `);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(utils.createPage("Lista de Cursos", body));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>Erro ao carregar Cursos: ${error}.</p>`);
            }
        } else if(req.url == '/instrumentos'){
            try{
                var instrumentos = await utils.getInstrumentos();
                var rows = Object.values(instrumentos).map(i => {
                    return `
                    <tr>
                        <td>${i.id}</td>
                        <td>${utils.link("/instrumentos/" + encodeURIComponent(i["#text"]), i["#text"])}</td>
                    </tr>
                    `
                }).join("");
                var body = utils.card("Lista de Instrumentos", `
                    <table class="w3-table w3-striped w3-bordered w3-hoverable">
                        <tr class="w3-light-grey">
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                        ${rows}
                    </table>
                    ${utils.botaoVoltar()}
                    `);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(utils.createPage("Lista de Instrumentos", body));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>Erro ao carregar Instrumentos: ${error}.</p>`);
            }
        } else if(req.url.startsWith('/instrumentos/')){
            try{
                const nome = req.url.split('/')[2];
                var instrumento = await utils.getInstrumento(nome);
                var body = utils.card(`Instrumento: ${instrumento.id}`, `${instrumento["#text"]}`) + utils.botaoVoltar();
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(utils.createPage("Instrumento", body));
            } catch(error){
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>Erro ao carregar Instrumento: ${error.message}.</p>`);
            }
        } else if(req.url.startsWith('/cursos/')){
            try{
                const id = req.url.split('/')[2]; 
                var curso = await utils.getCurso(id); 
                
                var body = utils.card(`Curso: ${curso.id}`, `${curso.designacao}`) + utils.botaoVoltar();
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(utils.createPage("Curso", body));
            } catch(error){
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>Erro ao carregar Curso: ${error.message}.</p>`);
            }
        }
        else { 
            var body = `
                ${utils.card("Página de Alunos", utils.link("/alunos", "Ver Alunos"))}
                ${utils.card("Página de Cursos", utils.link("/cursos", "Ver Cursos"))}
                ${utils.card("Página de Instrumentos", utils.link("/instrumentos", "Ver Instrumentos"))}
            `;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
            res.end(utils.createPage("Página da Escola de Música", body));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<p>Método não suportado: ${req.method}.</p>`);
    }
});

webServer.listen(18001);
console.log('Servidor Web a servir na porta 18001...');