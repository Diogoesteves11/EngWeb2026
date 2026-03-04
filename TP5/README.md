# **Engenharia Web 2026**

---
## **Março de 2026**
---

### **Autor**

* **ID:** A104004
* **Nome:** Diogo José Fernandes Esteves
* **Foto:** <img src="../Pic.jpeg" width="20%" />

---

### **Resumo**

Este projeto consistiu no desenvolvimento de uma aplicação web robusta para a gestão e consulta de um dataset cinematográfico, utilizando o ecossistema **Node.js** e o motor de templates **Pug**. 

A aplicação segue uma arquitetura onde o servidor Express atua como controlador, consumindo dados de uma API REST simulada (`json-server`) e servindo páginas dinâmicas ao utilizador.

As principais etapas e funcionalidades implementadas foram:
* **Scaffolding:** Estruturação inicial utilizando o `express-generator` para garantir as melhores práticas de organização de pastas (routes, views, public).
* **Tratamento de Dados com Python:** Desenvolvimento de um script para normalizar o dataset original (`cinema.json`). O script gera IDs únicos para os filmes e cria uma lista independente de atores, estabelecendo relações entre as duas entidades.
* **Interface:** Utilização da framework **W3.CSS**.

---

### **Lista de Resultados (Instruções de Execução)**

Para colocar o projeto em funcionamento:

1.  **Criação da Estrutura Base (Scaffolding):**
    ```bash
    npx express-generator --view=pug cinema-app
    ```

2.  **Tratamento do Dataset:**
    ```bash
    python3 dataset/dataset_treatment.py
    ```
    *(Gera o ficheiro `cinema_treated.json`)*

3.  **Lançamento da API (Base de Dados):**
    ```bash
    json-server --watch dataset/cinema_treated.json
    ```

4.  **Instalação de Dependências e Arranque do Servidor:**
    ```bash
    npm install
    npm start
    ```

---

### **Acesso à Aplicação**

Após executar os comandos acima, a interface web ficará disponível em:
* **Filmes:** [http://localhost:3007](http://localhost:3007)