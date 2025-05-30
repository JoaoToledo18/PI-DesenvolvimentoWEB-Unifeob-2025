
# Projeto Integrado: Desenvolvimento de Aplicação Web (UNIFEOB)

**Grupo 8**  
João Vitor Toledo da Silva  
Pedro de Freitas da Silva  

## 🎯 Objetivo e Descrição

Este projeto foi desenvolvido como parte do **Projeto Integrado** do módulo de **Desenvolvimento Web** do curso de Ciência da Computação(UNIFEOB).

O objetivo é desenvolver uma aplicação web funcional, aplicando os conhecimentos adquiridos nas disciplinas do módulo. A solução consiste em um sistema de gerenciamento para uma hamburgueria, com funcionalidades de cadastro, controle de pedidos e gerenciamento de usuários.

O projeto integra conceitos das seguintes disciplinas:

- **Integração de Dados:** Modelagem, conexão e manipulação de banco de dados MySQL.
- **Tecnologia para Desenvolvimento Web:** Desenvolvimento do backend, APIs REST e funcionalidades.
- **Desenvolvimento de Interface de Usuários para Web:** Criação de interfaces web com HTML, CSS, JavaScript e Bootstrap.
- **Computação em Nuvem:** Possível hospedagem e acesso remoto ao sistema.

---

## 🖥️ Descrição Técnica

### 🔗 Backend

O backend do projeto foi desenvolvido utilizando **Node.js** e **Express**, sendo responsável pela API REST que realiza toda a comunicação entre o frontend e o banco de dados. Nele estão implementadas regras de negócio, autenticação de usuários, controle de permissões e operações CRUD (Create, Read, Update, Delete) para as entidades do sistema, como produtos, categorias, mesas, funcionários e pedidos.

Funcionalidades principais do backend:
- API REST estruturada
- Middleware de autenticação e autorização por cargo (admin, garçom, cozinheiro, caixa)
- Integração com banco de dados MySQL
- Organização modular em controllers, config, middleware e rotas

### 🎨 Frontend

O frontend foi desenvolvido utilizando **HTML**, **CSS**, **JavaScript** e **Bootstrap**, oferecendo uma interface web amigável, responsiva e fácil de usar, tanto para o cliente quanto para os funcionários.

Funcionalidades principais do frontend:
- Tela inicial com navegação simples
- Telas de cadastro e login
- Gerenciamento de produtos, pedidos, mesas, categorias e funcionários
- Interface adaptada para diferentes tamanhos de tela (responsiva)

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição                          |
|-------------|-------------------------------------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | Backend, API REST |
| ![Express](https://img.shields.io/badge/-Express-black?logo=express&logoColor=white) | Framework backend |
| ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white) | Banco de dados relacional |
| ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white) | Estrutura do frontend |
| ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) | Estilização do frontend |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) | Funcionalidade e lógica no frontend |
| ![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?logo=bootstrap&logoColor=white) | Framework CSS para responsividade |
| ![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman&logoColor=white) | Teste das APIs |
| ![VSCode](https://img.shields.io/badge/-VSCode-007ACC?logo=visualstudiocode&logoColor=white) | IDE de desenvolvimento |

---

## 📂 Estrutura do Projeto

```plaintext
📦 PI-DesenvolvimentoWEB
 ┣ 📁 BackEnd
 ┃ ┣ 📁 src
 ┃ ┃ ┣ 📁 controllers   // Lógica das rotas
 ┃ ┃ ┣ 📁 middleware    // Autenticação e permissões
 ┃ ┃ ┣ 📁 config        // Conexão com banco
 ┃ ┃ ┗ 📄 api.js        // Definição das rotas
 ┃ ┣ 📄 server.js       // Arquivo principal do backend
 ┃ ┣ 📄 package.json    // Dependências
 ┃ ┗ 📄 .env            // Variáveis de ambiente
 ┣ 📁 FrontEnd
 ┃ ┗ 📄 (Arquivos HTML, CSS e JS)
 ┗ 📄 README.md         // Documentação
```

---

## 🔧 Como Instalar e Executar o Projeto

### ✅ Pré-requisitos

- Node.js instalado 
- MySQL instalado
- Editor de código

### 🛠️ Instalação

1. Clone o repositório:

```bash
git clone 
```

2. Acesse a pasta do backend:

```bash
cd PI-DesenvolvimentoWEB/BackEnd
```

3. Instale as dependências:

```bash
npm install
```

4. Configure o arquivo `.env` com os dados do seu banco de dados:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
PORT=4040
SECRET=chave_secreta
```

5. Execute o servidor:

```bash
npm start
```

6. Adicione dentro de FrontEnd/Config/config.js:

```
http://localhost:4040
```

### Banco de Dados

- Crie o banco de dados no MySQL.
- Execute o script SQL disponível para criar as tabelas.

---

## 💻 Funcionalidades

- 🔐 Login e controle de acesso por cargo (admin, garçom, cozinheiro, caixa)
- 📦 Cadastro e gerenciamento de:
  - Produtos
  - Categorias
  - Mesas
  - Funcionários
  - Pedidos
- 🗂️ Tela administrativa
- 🧾 Controle de pedidos em tempo real

---

## 👥 Autores

- João Vitor Toledo da Silva
- Pedro de Freitas da Silva

---

## 📜 Licença

Este projeto é de uso acadêmico, desenvolvido para fins educacionais no Projeto Integrado do módulo **Desenvolvimento Web**.

---
