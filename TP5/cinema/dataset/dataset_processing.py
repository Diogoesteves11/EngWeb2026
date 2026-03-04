import json

IDcounter = 1

def idGenerator(film):
    global IDcounter 
    
    genres = film.get('genres', []) 
    
    idStr = ''
    for g in genres:
        if len(g) > 0:
            idStr += g[0]
            
    novo_id = str(IDcounter) + idStr 
    IDcounter += 1
    
    return novo_id

with open('cinema.json', "r", encoding='utf-8') as f:
    data = json.load(f) 

newDataset = {}
films = []

actors_dict = {}

for film in data.get('filmes', []):
    newFilm = {}
    
    newFilm['id'] = idGenerator(film)
    newFilm['title'] = film.get('title')
    newFilm['year'] = film.get('year')
    newFilm['genres'] = film.get('genres', [])
    
    cast_ids = []
    
    for actor_name in film.get('cast', []):
        if actor_name not in actors_dict:
            actorID = str(IDcounter)
            IDcounter += 1
            
            actors_dict[actor_name] = {
                'id': actorID,
                'name': actor_name,
                'films': [] 
            }
        
        actors_dict[actor_name]['films'].append(newFilm['id'])
        
        cast_ids.append(actors_dict[actor_name]['id'])
        
    newFilm['cast'] = cast_ids 
    
    films.append(newFilm)

actors_list = list(actors_dict.values())

newDataset['filmes'] = films
newDataset['atores'] = actors_list

with open('cinema_treated.json', 'w', encoding='utf-8') as f:
    json.dump(newDataset, f, indent=2, ensure_ascii=False)

print("Ficheiro 'cinema_treated.json' criado com sucesso com as listas de filmes e atores separadas")