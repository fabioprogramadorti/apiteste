# API TESTE
Bem vindo(a) ao sistema Teste Api

Alem de objetivo ele é bem intuitivo, descrito em nodejs
conta com a infraestrutura jwt, ou seja, uma implementação de segurança
com token de acesso, niveis de acesso para diferentes usuários (cliente e gerente)
bem como uma arquitetura que segue os melhores padrões de arquitetura REST.

### Especificações técnicas para o uso da api

No momento da criação de nossa POC foi utilizado o NodeJs na versão v12.13.0 e o npm na versão 6.12.0. Verifique se você instalou o Node.js no seu computador, caso contrário navegue para https://nodejs.org, faça o download e instale a versão mais recente.
O deploy para testes de execução foi efetuado no ambiente Google Platform
podendo acessado pelo IP: http://35.245.70.233:3000.

### Estrutura do projeto
.\
├── config\
│   └── default.json\
├── controllers\
│   ├── auth.controller.js\
│   └── user.controller.js\
│   └── product.controller.js\
├── middleware\
│   └── auth.js\
├── migration\
│   ├── data\
│   │   ├── roles.json\
│   │   └── users.json\
│   └── migration.js\
├── models\
│   ├── role.model.js\
│   └── user.model.js\
├── package.json\
├── package-lock.json\
├── routes\
│   └── index.js\
├── services\
│   └── role.service.js\
├── test\
│   └── index.js\
├── util\
|   ├── index.js\
|   └── token.js\
├── LICENSE\
├── index.js\
└── README.md\

### Interface para o teste de api 
Para facilitar os testes foi disponibilizado na pasta postman_collection uma coleção que poderá ser importado no Postman e utilizado para os testes da prova de conceito, por este motivo aconcelhamos instalar o Postman, caso contrário você deverá configurar as requisições em seu aplicativo de sua preferência.

Na pasta migration existe o arquivo migration.js que pode ser utilizado para criar as coleções basicas com os registros aplicados em nossos testes, criando a coleção users e roles.


### Depêndencias Utilizadas
Nosso projeto precisará de vários pacotes npm e abaixo está a lista desses pacotes e uma breve explicação sobre o que cada um desses pacotes nos ajudará a alcançar.

mongodb - MongoDB é um software de banco de dados orientado a documentos, classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON.

config - Permite definir um conjunto de parâmetros padrões e estendê-los para diferentes ambientes de implantação usado neste projeto para recuperar configurações de acesso ao mongo, secredo para assinar o JWT e configurações do projeto.

joi - O joi permite que você descreva seus dados usando uma linguagem simples, intuitiva e legível, descrevemos nossos modelos de dados para validação de entrada dos dados, podendo ser extendido para atender a validação da saída de dados.

express - Uma estrutura node.js que facilita a criação de aplicativos da web.

mongoose - Uma ferramenta de modelagem de objetos projetada para funcionar em um ambiente assíncrono. Usaremos o mongoose para definir esquemas de banco de dados e interagir com o banco de dados Mongo.

jsonwebtoken - Uma implementação do JSON Web Token (JWT) que será usado para autenticação e autorização, podendo atender requisições assincronas e ou sincronas.

bcrypt - Isso nos ajudará a criar senhas de usuário com hash antes de armazená-las no banco de dados.

role-acl - Uma ferramenta para controle de acesso baseado em funções, atributos e condições para Node.js que permite mesclar as melhores características de dois mundos o RBAC e o ABAC, implementando os principios basicos do RBAC mas também se concentrando no recurso, atributos e condições de ação (ABAC - Attribute-based Access Control).


### Teste função Login

Efetuar o POST fazendo o login do usuário, gerando um JWT válido:
POST em http://35.245.70.233:3000/api/auth/login
body -> JSON -> {"username":"usuario.loja", "password": "123456"}
ou 
body -> JSON -> {"username":"gerente", "password": "123456"}

O primeiro login ("username":"usuario.loja") dara acesso somente à busca de um produto em específico
O segundo login ("username":"gerente") dara acesso a todas as funcionalidades da api (GET, POST, PUT, PATCH, DELETE)

É esperado receber o um JSON como retorno contendo o email do usuário, e no header do retorno um parâmetro chamado x-auth-token contendo o JWT do login, este deverá ser utilizado nas próximas requisições.


### Teste função List

Efetuar GET verificando os produtos inclusos na base de dados
- No Header do Postman inclua:
Authorization : (Token gerado no momento do login)
x-api-context : "{\"aplication\":\"AplicacaoTeste\"}"

GET em http://35.245.70.233:3000/api/product/list. \

Obs: Para o usuário: usuario.loja, o acesso não será permitido à essa funcionalidade
somente para o usuário : gerente.

É esperado receber o um JSON como retorno contendo o uma lista com todos os produtos existentes na base de dados.


### Teste função Register

Efetuar POST verificando a inclusão de novos produtos base de dados
- No Header do Postman inclua:
Authorization : (Token gerado no momento do login)
x-api-context : "{\"aplication\":\"AplicacaoTeste\"}"

POST em http://35.245.70.233:3000/api/product/register. \
body -> JSON -> {
	"productname": "Produto Teste",
	"amount": "10",
	"description": "Produto Teste Sistema Api",
	"price": "100,00"
}

Obs: Para o usuário: usuario.loja, o acesso não será permitido à essa funcionalidade
somente para o usuário : gerente.

É esperado receber o um JSON como retorno contendo o produdo incluso na base de dados e deu ID.


### Teste função Modify (PUT)

Efetuar PUT verificando a inclusão de novos produtos base de dados
- No Header do Postman inclua:
Authorization : (Token gerado no momento do login)
x-api-context : "{\"aplication\":\"AplicacaoTeste\"}"

PUT em http://35.245.70.233:3000/api/product/modify/5f73f0c811acaa529fe5597f. \
body -> JSON -> {
	"productname": "Produto Modificado",
	"amount": "100",
	"description": "Produto Teste Modificado",
	"price": "999,99"
}

Obs: Para o usuário: usuario.loja, o acesso não será permitido à essa funcionalidade
somente para o usuário : gerente.

É esperado receber o um JSON como retorno contendo o produto modificado na base de dados e deu ID
(todos os dados devem ser modificados).

### Teste função Modify (PATCH)

Efetuar PATCH verificando a inclusão de novos produtos base de dados
- No Header do Postman inclua:
Authorization : (Token gerado no momento do login)
x-api-context : "{\"aplication\":\"AplicacaoTeste\"}"

PATCH em http://35.245.70.233:3000/api/product/modify/5f73f0c811acaa529fe5597f. \
body -> JSON -> {
	"productname": "Produto Modificado novo"
}

Obs: Para o usuário: usuario.loja, o acesso não será permitido à essa funcionalidade
somente para o usuário : gerente.

É esperado receber o um JSON como retorno contendo o produto modificado na base de dados e deu ID
(apenas um dado por vês deve ser modificado).

### Teste função Delete 

Efetuar DELETE verificando a inclusão de novos produtos base de dados
- No Header do Postman inclua:
Authorization : (Token gerado no momento do login)
x-api-context : "{\"aplication\":\"AplicacaoTeste\"}"

PATCH em http://35.245.70.233:3000/api/product/delete/5f73f0c811acaa529fe5597f. \

Obs: Para o usuário: usuario.loja, o acesso não será permitido à essa funcionalidade
somente para o usuário : gerente.

É esperado receber o um JSON como a confirmação de produto deletado da base de dados.

### Teste função ListById 

Efetuar GET verificando a inclusão de novos produtos base de dados
- No Header do Postman inclua:
Authorization : (Token gerado no momento do login)
x-api-context : "{\"aplication\":\"AplicacaoTeste\"}"

PATCH em http://35.245.70.233:3000/api/product/listById/5f73f09411acaa529fe5597e. \

Obs: Tanto para o usuário: usuario.loja, quanto para o usuário : gerente. essa funcionalidade sera permitida.

É esperado receber o um JSON como apenas um produto de acordo com o ID incluso da URI.
