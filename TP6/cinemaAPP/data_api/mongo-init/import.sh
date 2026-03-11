#!/bin/bash

python3 /docker-entrypoint-initdb.d/datasetProcessing.py

mongoimport --host localhost --db cinema --collection films --type json --file /docker-entrypoint-initdb.d/films.json --jsonArray

mongoimport --host localhost --db cinema --collection actors --type json --file /docker-entrypoint-initdb.d/actors.json --jsonArray

mongoimport --host localhost --db cinema --collection genres --type json --file /docker-entrypoint-initdb.d/genres.json --jsonArray


# 4. Criar índices para otimizar pesquisas
mongosh cinema --eval '
  db.films.createIndex({ title: "text", cast: "text", genres: "text" });
  db.actors.createIndex({ name: "text" });
  db.genres.createIndex({ name: "text" });
'
