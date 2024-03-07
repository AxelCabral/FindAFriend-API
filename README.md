# FindAFriend-API
 API desenvolvida para o desafio do módulo 3 do curso de Node da RocketSeat

# App

App para adoção de Animais.

## Tecnologias
- NodeJS
- NPM
- ESLint
- Vitest
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Docker
- JWT
- GitHub Actions

## RFs (Requisitos Funcionais)

- [X] - Deve ser possível cadastrar um pet;
- [X] - Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [X] - Deve ser possível filtrar pets por suas características;
- [X] - Deve ser possível visualizar detalhes de um pet para adoção;
- [X] - Deve ser possível se cadastrar como uma ORG;
- [X] - Deve ser possível realizar login como uma ORG;

## RNs (Regras de negócio)

- [X] - Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [X] - Uma ORG precisa ter um endereço e um número de WhatsApp;
- [X] - Um pet deve estar ligado a uma ORG;
- [X] - O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [X] - Todos os filtros, além da cidade, são opcionais;
- [X] - Para uma ORG acessar a aplicação como admin, ela precisa estar logada;

## RNFs (Requisitos não funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);
