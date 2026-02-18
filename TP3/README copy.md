# **Engenharia Web 2026**

---
## **Fevereiro de 2026**
---
### **Autor**

* ID: A104004
* Nome: Diogo José Fernandes Esteves
* Foto: 

<img src="../Pic.jpeg" width="20%" />

### Resumo: 

* Neste TPC, o objetivo foi criar um sistema web em Node.js assente numa arquitetura de dois servidores:
  * **Servidor de Dados (API):** A correr na porta 18000, atua como intermediário, obtendo os dados de um `json-server` (porta 3000), tratando-os (ordenação, formatação) e devolvendo-os em formato JSON.
  * **Servidor Web (Interface):** A correr na porta 18001, consome a API de dados (porta 18000) através do Axios e gera dinamicamente as páginas HTML (views) para o utilizador final.
* Foi desenvolvido um ficheiro `utils.js` para auxiliar na formatação de datas e modularizar a construção do HTML (cards, links, tabelas).

### Lista de Resultados: 

* Para executar o projeto na sua totalidade, utilize os seguintes comandos (em terminais separados):
  1. Base de dados: `npx json-server --watch db.json --port 3000`
  2. Servidor de API: `node data_API_server.js`
  3. Servidor Web: `node serverApp.js`
* A interface web ficará disponível no browser em: `http://localhost:18001`