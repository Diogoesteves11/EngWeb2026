# **Engenharia Web 2026**

---
## **TPC 2 - Fevereiro de 2026**
---

### **Autor**
* **ID:** A104004
* **Nome:** Diogo José Fernandes Esteves
* **Foto:**

<img src="../Pic.jpeg" width="20%" />

### Resumo

Neste TPC, o objetivo foi desenvolver um servidor web de nível aplicacional para processar os seguintes pedidos:

* **`GET /reparacoes`**: Devolve uma tabela HTML com a lista das reparações realizadas (ordenada alfabeticamente por nome).
* **`GET /intervencoes`**: Devolve uma tabela HTML com os diferentes tipos de intervenções, sem repetições e com a contagem do número de ocorrências (ordenada por código).
* **`GET /viaturas`**: Devolve uma tabela HTML com as diferentes marcas e o respetivo somatório do número de intervenções realizadas (ordenada alfabeticamente por marca).

### Instruções de Execução

1. **Instalar dependências:**
   `npm install axios`

2. **Iniciar o servidor de dados (API):**
    `json-server --watch dataset_reparacoes.json`

3. **Iniciar o servidor aplicacional (noutro terminal):**
    `node server.js`

4. **Testar os pedidos:**
    `http://localhost:7777/reparacoes`
    `http://localhost:7777/intervencoes`
    `http://localhost:7777/viaturas`