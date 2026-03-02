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

* Neste projeto, o objetivo foi desenvolver uma aplicação web em Node.js dedicada à gestão de Exames Médicos Desportivos (EMD), utilizando a estrutura normalizada da ferramenta **Express Generator**.
* A arquitetura do sistema baseia-se num padrão MVC (Model-View-Controller), onde o servidor (através das rotas) atua como controlador, consumindo e manipulando dados de uma REST API simulada através do `json-server`, e gerando as interfaces de resposta através do motor de *templates* **Pug**.
* O trabalho incluiu as seguintes fases e implementações:
  * **Tratamento de Dados:** Criação de um *script* em Python para normalizar e tratar o dataset inicial (`emd.json`), gerando o `emd_fixed.json`.
  * **CRUD Completo:** Implementação das rotas (`routes/index.js`) e da lógica (`fetch`) para Listar, Consultar, Inserir (POST), Editar (PUT) e Apagar (DELETE) registos de EMDs.
  * **Interface Dinâmica:** Utilização do motor de *templates* Pug (na diretoria `views/`) em conjunto com a *framework* W3.CSS para criar uma interface limpa, responsiva e agradável.
  * **Dashboard de Estatísticas:** Criação de um módulo analítico (`public/javascripts/utils.js`) para calcular a distribuição de exames por Género, Modalidade, Clube, Resultado e Estado Federado, apresentados num *dashboard* visual.

### Lista de Resultados: 

* O projeto adotou a hierarquia do Express Generator, destacando-se os seguintes ficheiros e diretorias:
  * `dataset/emd_fixed.json`: Base de dados tratada e pronta a usar pela API.
  * `app.js` e `bin/www`: Configuração base do servidor Express e ponto de entrada da aplicação.
  * `routes/index.js`: Onde está centralizado todo o roteamento da aplicação e os pedidos HTTP à API.
  * `public/javascripts/utils.js`: Módulo contendo a função `getStats` para o processamento estatístico dos dados.
  * `views/`: Diretoria contendo os *templates* Pug (ex: `index.pug`, `emdRegisterPage.pug`, `emdEditPage.pug`, `emdStatPage.pug`).

### Instruções de Execução:

Para executar o projeto na sua totalidade, utilize os seguintes comandos (em terminais separados):
1. **Tratamento do dataset:** `python3 dataset/dataset_treatment.py` *(caso ainda não tenha sido gerado o ficheiro fixed)*
2. **Instalação de Dependências:** `npm install` *(instala automaticamente o Express, Pug e restantes dependências do `package.json`)*
3. **Lançamento da API (Base de Dados):** `npx json-server --watch dataset/emd_fixed.json --port 3000`
4. **Servidor Web (Express):** `npm start`.

A interface web ficará disponível no browser em: `http://localhost:7777` (ou na porta configurada no ficheiro `bin/www`).