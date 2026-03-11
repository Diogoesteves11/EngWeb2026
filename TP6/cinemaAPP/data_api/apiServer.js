const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + ' ' + req.url + " " + d)
    next()
})

const cinema = 'cinema'

const MONGODB_URL = process.env.MONGO_URL

mongoose.connect(MONGODB_URL)
.then(() => {
    console.log(`MongoDB: Conexão à base de dados '${cinema}' estabelecida`)
})
.catch(err => console.error('Erro na conexão: ' + err))

const genericSchema = new mongoose.Schema({}, { strict: false, versionKey: false })


const Film = mongoose.model('Film', genericSchema, 'films')
const Actor = mongoose.model('Actor', genericSchema, 'actors')
const Genre = mongoose.model('Genre', genericSchema, 'genres')

const modelMap = {
    '/filmes': Film,
    '/atores': Actor,
    '/generos': Genre
}

app.get(['/filmes', '/atores', '/generos'], async(req,res) => {

    let collection = modelMap[req.path]

    try{
        let queryObj = {...req.query}

        const searchTerm = queryObj.q;
        const fields = queryObj._select; // "_select=title,year"
        const sortField = queryObj._sort;
        const sortOrder =  queryObj._order === 'desc'? -1 : 1;

        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;


        let mongoQuery = {}
        let mongoProj = {}
        let mongoSort = {}

        if (searchTerm) {
            mongoQuery = { $text: { $search: searchTerm } };

            mongoProj.score = { $meta: "textScore" };
            mongoSort = { score: { $meta: "textScore" } };
        } else {
            mongoQuery = queryObj;
        }

        // _select : converte "title,year " em {title: 1, year: 1}
        if (fields){
            fields.split(',').forEach(f => {
                mongoProj[f.trim()] = 1;
            });
        }

        let execQuery = collection.find(mongoQuery, mongoProj)

        if (sortField) {
            execQuery = execQuery.sort({ [sortField]: sortOrder }); // executa, caso exista uma query de sort "{title : 1}" por exemplo, no 3 campo do find"
        } else if (searchTerm) {
            execQuery = execQuery.sort(mongoSort);
        }

        const data = await execQuery.exec(); 
        res.json(data);
    
    } catch(err){
        res.status(500).json({Erro: err.message});
    }
})

app.get(['/filmes/:id', '/atores/:id'], async (req, res) => {
    const baseRoute = '/' + req.path.split('/')[1]
    let collection = modelMap[baseRoute]
    const f_id = req.params.id
    try{
        const data = await collection.findOne({id: f_id});
        if (!res) return res.status(404).json({ error: "Registo Não encontrado" });
        res.json(data);
    }catch(err){
        res.status(500).json({Erro: err.message});
    }
})




const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor de dados correr na porta ${PORT}`)
})



