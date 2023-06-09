
# Iza

Este projeto trata-se apenas de uma breve apresentação de como ficaria um CRUD de clientes/usuarios que cadastram produtos.

Gostaria de frisar que a estrutura foi desenhada pensando em isolar a regra de negocio da aplicação utilizando o "clean arch" e boas práticas como Clean Code e SOLID.



Para iniciar o projeto basta ter o Docker instalado junto ao docker compose e executar o comando docker compose up.

Estrutura do Banco:
╔══════════════╗       
║    Customer        
╠══════════════╣
║ customer_id  
║ name         
║ email        
║ password     
╚══════════════╝
       1
       ║
       ║
       ║
       N  
╔════════════╗       
║ Product         
╠════════════╣
║ product_id 
║ customer_id
║ name       
║ price      
║ description
║ photo      
╚════════════╝


╔══════════════╗       
║    Customer         
╠══════════════╣       
║ customer_id   
║ name         
║ email               
║ password             
║                     
║                      
╚══════════════╝       
       1
       ║
       ║
       ║
       1  
╔══════════════╗
║   Address    
╠══════════════╣
║ address_id   
║ customer_id  
║ zipcode      
║ state        
║ city         
║ street       
╚══════════════╝

