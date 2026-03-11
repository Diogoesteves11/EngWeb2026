import json
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

original_dataset = os.path.join(script_dir, 'cinema.json')

films_file = os.path.join(script_dir, 'films.json')
actors_file = os.path.join(script_dir, 'actors.json')
genres_file = os.path.join(script_dir, 'genres.json')


def process():
    try:
        with open(original_dataset, 'r', encoding='utf-8') as f:
            dataset = json.load(f)
        
        films = []
        actors_dict = {}
        genres_dict = {}
        
        film_counter = 1
        actor_counter = 1
        genre_counter = 1
        
        for film in dataset.get('filmes', []):
            film_id = str(film_counter)
            
            
            film_cast_ids = []
            film_genre_ids = []
            
            
            for actor_name in film.get('cast', []):
                if actor_name not in actors_dict:
                    actors_dict[actor_name] = {
                        "id": str(actor_counter),
                        "name": actor_name,
                        "films": [] 
                    }
                    actor_counter += 1
                
                
                actor_id = actors_dict[actor_name]["id"]
                film_cast_ids.append(actor_id)
                
                actors_dict[actor_name]["films"].append(film_id)
                
            
            for genre_name in film.get('genres', []):
                if genre_name not in genres_dict:
                    genres_dict[genre_name] = {
                        "id": str(genre_counter),
                        "name": genre_name,
                        "films": [] 
                    }
                    genre_counter += 1
                    
                
                genre_id = genres_dict[genre_name]["id"]
                film_genre_ids.append(genre_id)
                
                
                genres_dict[genre_name]["films"].append(film_id)
                
            films.append({
                "id": film_id, 
                "title": film.get("title"),
                "year": film.get("year"),
                "cast": film_cast_ids,    
                "genres": film_genre_ids  
            })
                
            film_counter += 1
        
        
        actors = list(actors_dict.values())
        genres = list(genres_dict.values())
        
        with open(films_file, 'w', encoding='utf-8') as f:
            json.dump(films, f, indent=4, ensure_ascii=False)
            
        with open(actors_file, 'w', encoding='utf-8') as f:
            json.dump(actors, f, indent=4, ensure_ascii=False)
            
        with open(genres_file, 'w', encoding='utf-8') as f:
            json.dump(genres, f, indent=4, ensure_ascii=False)
            
        print("Dataset processado e normalizado com sucesso!")
        print(f"Total de Filmes: {len(films)}")
        print(f"Total de Atores únicos: {len(actors)}")
        print(f"Total de Géneros únicos: {len(genres)}")
            
    except Exception as e:
        print(f'Erro durante o processamento: {str(e)}')

if __name__ == "__main__":
    process()