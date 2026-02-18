const http = require('http');
const axios = require('axios');
const utils = require('./utils.js');

var server = http.createServer(async function (req,res) {
    utils.logDate(req);
    switch(req.method){
        case 'GET': {
            if(req.url == '/alunos'){
                try{
                    const resp = await axios.get('http://localhost:3000/alunos');
                    const students = resp.data;
                    const studentsArray = Object.entries(students); // transformação de objeto em lista de entries (chave, valor)

                    studentsArray.sort((a, b) => {
                        const alunoA = a[1];
                        const alunoB = b[1];
                        return alunoA.nome.localeCompare(alunoB.nome);
                    });
                
                    const orderedStudents = Object.fromEntries(studentsArray); // reconstrução do objeto
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(orderedStudents));

                } catch(error){
                        res.writeHead(502, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({
                            erro: "Erro ao contactar o servidor de dados",
                            detalhe: error.message
                        }))
                }
            } else if(req.url == '/cursos'){
                try{
                    const resp = await axios.get('http://localhost:3000/cursos');
                    const courses = resp.data;
                    const coursesArray = Object.entries(courses); 

                    coursesArray.sort((a, b) => {
                        const courseA = a[1];
                        const courseB = b[1];
                        return courseA.id.localeCompare(courseB.id);
                    });
                
                    const orderedCourses = Object.fromEntries(coursesArray); 
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(orderedCourses));
                    } catch(error){
                        res.writeHead(502, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({
                            erro: "Erro ao contactar o servidor de dados",
                            detalhe: error.message
                        }))
                    }
            } else if(req.url == '/instrumentos'){
                try{
                    const resp = await axios.get('http://localhost:3000/instrumentos');
                    const instrumentos = resp.data;
                    

                    const instrumentosArray = Object.entries(instrumentos); 

                    instrumentosArray.sort((a, b) => {
                        const iA = a[1];
                        const iB = b[1];
                        return iA.id.localeCompare(iB.id);
                    });
                
                    const orderedInstrumentos = Object.fromEntries(instrumentosArray); 

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(orderedInstrumentos));
                    } catch(error){
                        res.writeHead(502, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({
                            erro: "Erro ao contactar o servidor de dados",
                            detalhe: error.message
                        }))
                    }
            } else if(req.url.startsWith('/instrumentos/')){
                    const nome = decodeURIComponent(req.url.split('/')[2]);
                    try {
                        const resp = await axios.get('http://localhost:3000/instrumentos');
                        const instrumentos = resp.data;
                    
                        const instObj = instrumentos.find(i => i["#text"] === nome);
                    
                        if (instObj) {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(instObj));
                        } else {
                            res.writeHead(404, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ erro: "Instrumento não encontrado" }));
                        }
                    } catch (error) {
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ erro: error.message }));
                    }
            } else if(req.url.startsWith('/cursos/')){
                const id = req.url.split('/')[2];
                try {
                    const resp = await axios.get('http://localhost:3000/cursos/' + id);
                    if (resp.data) {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(resp.data));
                    } else {
                        res.writeHead(404, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ erro: "Curso não encontrado" }));
                    }
                } catch (error) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ erro: error.message }));
                }
            }
            else {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    erro: "Rota não suportada",
                    metodo: req.method,
                    caminho: req.url
                }))
            }
            break;
        }
        default: {
            res.writeHead(405, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                erro: "Método não permitido",
                metodo: req.method
            }))
        }
    }
});

server.listen(18000);
console.log('Servidor a servir na porta 18000...');