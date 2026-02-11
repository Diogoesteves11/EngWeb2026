# **Engenharia Web 2026**

---
## **Fevereiro de 2026**
---
### **Autor**

* ID: A104004
* Nome: Diogo José Fernandes Esteves
* Foto: 

<img src="Pic.jpeg" width="20%" />

### Resumo : 

* Neste TPC, o objetivo foi desenvolver um servidor web de nivel aplicacionar para servir os seguintes pedidos:

** GET /reparações : resposta com uma tabela html com os dados das reparações realizadas (oredenada por ordem alfabética de nome).
** GET /intervencoes: resposta com uma tabela html com os diferentes tipos de reparações, sem repetições e com contagem do nº de entradas (oredenada por ordem de código).
** GET /viaturas: resposta com tabela html com as diferentes marcas e respetivo somatório do número de reparações em que esteve presentes (ordenada por ordem alfabética de marca). 

### Lista de Resultados: 

* Executar comando para instalar axios: `npm install axios`
* Executar comando para iniciar servidor de dados: `json-server --watch dataset_reparacoes.json'
* Executar, noutro terminal, comando para iniciar servidor aplicacional: 'node server.js'
* Realizar pedidos do género de: 

** 'http://localhost:7777/viaturas' no browser, no terminal (através de curl) ou no postman

