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

* Neste projeto, o objetivo foi desenvolver uma aplicação web completa em Node.js (e com o auxilio da *framework* Express), dedicado à gestão de Exames Médicos Desportivos (EMD). 
* A arquitetura do sistema baseia-se num servidor que atua como controlador e gerador de interfaces (Pug), consumindo e manipulando dados de uma REST API simulada através do `json-server`.
* O trabalho incluiu as seguintes fases e implementações:
  * **Tratamento de Dados:** Criação de um *script* em Python para normalizar e tratar o dataset inicial (emd.json) gerando o emd_fixed.json.
  * **CRUD Completo:** Implementação das rotas e lógica para Listar, Consultar, Inserir (POST), Editar (PUT) e Apagar (DELETE) registos de EMDs.
  * **Interface Dinâmica:** Utilização do motor de *templates* Pug em conjunto com a *framework* W3.CSS para criar uma interface limpa, responsiva e agradável, separando a lógica de apresentação em `templates.js`.
  * **Dashboard de Estatísticas:** Criação de um módulo analítico (`utils.js`) para calcular a distribuição de exames por Género, Modalidade, Clube, Resultado e Estado Federado, apresentados num *dashboard* visual.

### Lista de Resultados: 

* O projeto gerou os seguintes ficheiros principais:
  * `emd_fixed.json`: Base de dados tratada e pronta a usar.
  * `app.js` (ou equivalente): O servidor Express principal com o roteamento.
  * `templates.js`: Módulo com as funções de renderização das *views* Pug.
  * `utils.js`: Módulo com a função `getStats` para tratamento estatístico dos dados.
  * Vistas Pug na pasta `views/`: Posições para lista, formulários (registo e edição), página de perfil e *dashboard* de estatísticas.
* Para executar o projeto na sua totalidade, utilize os seguintes comandos (em terminais separados):
  1. Tratamento do dataset: `python3 dataset/dataset_treatment.py`
  2. Dependências: `npm i pug` & `npm i express`
  3. Base de dados: `json-server --watch dataset/emd_fixed.json`
  4. Servidor Web (Express): `node src/server.js`
* A interface web ficará disponível no browser em: `http://localhost:7777` ou em `http://localhost:7777/emd`