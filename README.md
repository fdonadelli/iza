
# Iza

Este projeto trata-se apenas de uma breve apresentação de como ficaria um CRUD de clientes/usuarios que cadastram produtos.

Gostaria de frisar que a estrutura foi desenhada pensando em isolar a regra de negocio da aplicação utilizando o "clean arch" e boas práticas como Clean Code e SOLID.



Para iniciar o projeto basta ter o Docker instalado junto ao docker compose e executar os comandos

docker compose up db.
usar o comando nest start ou o debugger

você tambem pode usar somente o comando docker compose up e precisa alterar o host no .env para 'db' para ele pegar as configs do docker



Estrutura do Banco:
https://drive.google.com/file/d/1IebmpPmO-YQuN2SZt1VkDIm5rZIazRhy/view?usp=sharing


API's: 

Criar usuario:
curl --location --request POST 'http://localhost:3004/users/account' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "name",
    "email": "email@teste.com",
    "password": "pass"
}'

