## Installation

```bash
$ npm install
```

O arquivo .env pode ser criado igual ao .env.example

## Running the app

Com o docker rodano, basta rodar os seguintes comandos.

```bash
# docker
$ docker compose up -d

# migrations
$ npm run migration:run

# Em um terminal separado
$ npm run fake-api

# Em um terminal separado
$ npm run start:dev
```

Este comando para rodar uma api fake é importante para observar o funcinamento da fila, no caso eu usei Bull com Redis e a api fake simula um crm com endpoints post, patch e delete. A visualização do banco de dados deste crm pode ser observada no arquivo crm.json. Essa fake api acaba tendo um comportamento de hard delete no endpoint de deletar veiculo, então não precisa estranhar caso o dado não tenha um softdelete de dentro da base do crm.json

## Test

```bash
# unit tests
$ npm run test
```

## Api Documentation

Ex: http://localhost:3000/api

## CRM API

O Fake CRM esta configurado para rodar na porta 8000

EX: http://localhost:8000/vehicles (get para buscar todos os veiculos)
