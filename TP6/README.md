# **Engenharia Web 2026**

---
## **Março de 2026**
---

### **Autor**

* [cite_start]**ID:** A104004 [cite: 1]
* [cite_start]**Nome:** Diogo José Fernandes Esteves [cite: 1]
* **Foto:** <img src="../Pic.jpeg" width="20%" />

---

### **Resumo**

Este projeto consistiu no desenvolvimento de uma aplicação web de **3 camadas (3-tier)** para a gestão e consulta de um dataset cinematográfico. A arquitetura foi desenhada para ser escalável e isolada, utilizando **Docker** para a orquestração de microserviços.

A aplicação utiliza uma stack tecnológica moderna:
* **Camada de Dados:** Utilização do **MongoDB** para persistência de documentos.
* **Camada de Serviço (API):** Servidor de dados em **Node.js/Express** utilizando **Mongoose** para a modelação.
* **Camada de Interface:** Servidor web em **Node.js** utilizando o motor de templates **Pug**.

Principais funcionalidades:
* **Normalização:** Dataset tratado com Python para garantir integridade entre Filmes, Atores e Géneros através de atributos `id`.
* **Navegação Dinâmica:** Tabelas interativas com suporte a ordenação por diversos parâmetros via Query Strings.
* **Interface Responsiva:** Utilização da framework **W3.CSS** para garantir usabilidade em diferentes dispositivos.

---

### **Estrutura do Projeto (Microserviços)**

O ecossistema é composto por três serviços principais definidos no ficheiro `docker-compose.yml`:
* **`mongodb`**: Instância da base de dados NoSQL.
* **`dataAPI` (Porta 3000)**: Servidor de dados que expõe os endpoints `/filmes`, `/atores` e `/generos`.
* **`interface` (Porta 7790)**: Ponto de entrada para o utilizador final.

---

### **Lista de Resultados (Instruções de Execução)**

Para colocar o projeto em funcionamento num ambiente Docker:

1.  **Arranque da Stack:**
    Utilize o comando abaixo na raiz do projeto para construir as imagens e levantar os contentores:
    ```bash
    docker-compose up -d --build
    ```

3.  **Importação de Dados:**
    O serviço `mongodb` executa o script `import.sh` no arranque para carregar os ficheiros JSON para as coleções respetivas.

---

### **Acesso à Aplicação**

Após o arranque, a interface web ficará disponível nos seguintes endereços:
* **Página Principal (Filmes):** [http://localhost:7790/filmes](http://localhost:7790/filmes)
* [cite_start]**Lista de Atores:** [http://localhost:7790/atores](http://localhost:7790/atores) [cite: 2]
* [cite_start]**Lista de Géneros:** [http://localhost:7790/generos](http://localhost:7790/generos) [cite: 2]
