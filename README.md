# API de Gerenciador de RPG

Esta API permite o gerenciamento de personagens e itens mágicos em um sistema de RPG, incluindo operações de CRUD, relacionamento entre personagens e itens, e validações de regras de negócio.

## Instalacao
Primeiramente faca um clone deste repositorio <br>
Apos isso, escreva no terminal `npm i`<br>
Quando os pacotes terminarem de serem instalados, escreva no terminal  `npm run start:dev`


# Rotas
Utilize o swagger na rota `http://localhost:3000/api#/` para uma melhor experiencia<br>
Ou use a rota padrao `http://localhost:3000/`

### Personagens

#### 1. Criar Personagem
`POST /characters`

**Request:**
```json
{
  "name": "Aragorn",
  "adventurerName": "Strider",
  "class": "Guerreiro",
  "strength": 7,
  "defense": 3
}
```

**Response (201 Created):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k",
  "name": "Aragorn",
  "adventurerName": "Strider",
  "class": "Guerreiro",
  "level": 1,
  "magicItems": [],
  "strength": 7,
  "defense": 3,
  "totalStrength": 7,
  "totalDefense": 3
}
```

#### 2. Listar Todos os Personagens
`GET /characters`

**Response (200 OK):**
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "Aragorn",
    "adventurerName": "Strider",
    "class": "Guerreiro",
    "level": 1,
    "magicItems": [],
    "strength": 7,
    "defense": 3,
    "totalStrength": 7,
    "totalDefense": 3
  },
  {
    "_id": "75b2c3d4e5f6g7h8i9j0k1l",
    "name": "Gandalf",
    "adventurerName": "Mithrandir",
    "class": "Mago",
    "level": 1,
    "magicItems": ["65a1b2c3d4e5f6g7h8i9j0m"],
    "strength": 2,
    "defense": 8,
    "totalStrength": 5,
    "totalDefense": 10
  }
]
```

#### 3. Buscar Personagem por ID
`GET /characters/:id`

**Response (200 OK):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k",
  "name": "Aragorn",
  "adventurerName": "Strider",
  "class": "Guerreiro",
  "level": 1,
  "magicItems": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0m",
      "name": "Espada Narsil",
      "type": "Arma",
      "strength": 5,
      "defense": 0
    }
  ],
  "strength": 7,
  "defense": 3,
  "totalStrength": 12,
  "totalDefense": 3
}
```

#### 4. Atualizar Nome de Aventureiro
`PUT /characters/:id`

**Request:**
```json
{
  "adventurerName": "Rei Aragorn"
}
```

**Response (200 OK):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k",
  "name": "Aragorn",
  "adventurerName": "Rei Aragorn",
  "class": "Guerreiro",
  "level": 1,
  "magicItems": ["65a1b2c3d4e5f6g7h8i9j0m"],
  "strength": 7,
  "defense": 3,
  "totalStrength": 12,
  "totalDefense": 3
}
```

#### 5. Remover Personagem
`DELETE /characters/:id`

**Response (200 OK):**
```json
{
  "message": "Personagem removido com sucesso"
}
```

---

### Itens Mágicos

#### 1. Criar Item Mágico
`POST /magic-items`

**Request:**
```json
{
  "name": "Capa Élfica",
  "type": "Armadura",
  "strength": 0,
  "defense": 4
}
```

**Response (201 Created):**
```json
{
  "_id": "75b2c3d4e5f6g7h8i9j0k1n",
  "name": "Capa Élfica",
  "type": "Armadura",
  "strength": 0,
  "defense": 4
}
```

#### 2. Listar Todos os Itens
`GET /magic-items`

**Response (200 OK):**
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0m",
    "name": "Espada Narsil",
    "type": "Arma",
    "strength": 5,
    "defense": 0
  },
  {
    "_id": "75b2c3d4e5f6g7h8i9j0k1n",
    "name": "Capa Élfica",
    "type": "Armadura",
    "strength": 0,
    "defense": 4
  }
]
```

#### 3. Buscar Item por ID
`GET /magic-items/:id`

**Response (200 OK):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0m",
  "name": "Espada Narsil",
  "type": "Arma",
  "strength": 5,
  "defense": 0
}
```

#### 4. Remover Item
`DELETE /magic-items/:id`

**Response (200 OK):**
```json
{
  "message": "Item mágico removido com sucesso"
}
```

---

### Relacionamento Personagem-Item

#### 1. Adicionar Item ao Personagem
`POST /characters/:id/items`<br>
(o corpo do json dever ser o item que sera adicionado e na url da rota deve ser colocado o id do personagem que recebera o item)

**Request:**
```json
{
  "itemId": "75b2c3d4e5f6g7h8i9j0k1n"
}
```

**Response (200 OK):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k",
  "name": "Aragorn",
  "adventurerName": "Rei Aragorn",
  "class": "Guerreiro",
  "level": 1,
  "magicItems": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0m",
      "name": "Espada Narsil",
      "type": "Arma",
      "strength": 5,
      "defense": 0
    },
    {
      "_id": "75b2c3d4e5f6g7h8i9j0k1n",
      "name": "Capa Élfica",
      "type": "Armadura",
      "strength": 0,
      "defense": 4
    }
  ],
  "strength": 7,
  "defense": 3,
  "totalStrength": 12,
  "totalDefense": 7
}
```

#### 2. Listar Itens do Personagem
`GET /characters/:id/items`

**Response (200 OK):**
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0m",
    "name": "Espada Narsil",
    "type": "Arma",
    "strength": 5,
    "defense": 0
  },
  {
    "_id": "75b2c3d4e5f6g7h8i9j0k1n",
    "name": "Capa Élfica",
    "type": "Armadura",
    "strength": 0,
    "defense": 4
  }
]
```

#### 3. Remover Item do Personagem
`DELETE /characters/:characterId/items/:itemId`

**Response (200 OK):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k",
  "name": "Aragorn",
  "adventurerName": "Rei Aragorn",
  "class": "Guerreiro",
  "level": 1,
  "magicItems": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0m",
      "name": "Espada Narsil",
      "type": "Arma",
      "strength": 5,
      "defense": 0
    }
  ],
  "strength": 7,
  "defense": 3,
  "totalStrength": 12,
  "totalDefense": 3
}
```

#### 4. Buscar Amuleto do Personagem
`GET /characters/:id/amuleto`

**Response (200 OK) - Quando existe:**
```json
{
  "_id": "85c3d4e5f6g7h8i9j0k1l2m",
  "name": "Amuleto de Lorien",
  "type": "Amuleto",
  "strength": 2,
  "defense": 2
}
```

**Response (200 OK) - Quando não existe:**
```json
null
```

---

### Tratamento de Erros

#### Soma de força e defesa inválida
**Request:**
```json
{
  "name": "Frodo",
  "adventurerName": "Portador do Anel",
  "class": "Ladino",
  "strength": 6,
  "defense": 5
}
```
**Response (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": "A soma de força e defesa deve ser exatamente 10",
  "error": "Bad Request"
}
```

#### Segundo amuleto
**Response (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": "O personagem já possui um amuleto",
  "error": "Bad Request"
}
```

#### Item não encontrado
**Response (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Magic item with ID 123abc not found",
  "error": "Not Found"
}
```

---

> Este documento cobre as operações completas da API, incluindo regras de negócio, manipulação de relacionamentos e exemplos de erros.

