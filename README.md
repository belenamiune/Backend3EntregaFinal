# Backend 3 - Entrega final

Microservicio en Node.js + Express + MongoDB (Mongoose) que genera datos mock de usuarios y mascotas, los expone vía endpoints y permite insertarlos en base de datos para su verificación.

📚 Proyecto entregado para el curso Backend III: Testing y Escalabilidad – Coderhouse

---

## ⚙️ Prerrequisitos

- FakerJS
- Bcrypt
- Express
- MongoDB + Mongoose

## 🚀 Instalación

Cloná el repositorio:

```bash
git clone https://github.com/belenamiune/Backend3PrimeraPreentrega
cd primeraPreentrega
npm install

```

## 🔗 Endpoints disponibles

Base URL: http://localhost:3000

### ✅ GET /

Descripción: Ruta de verificación (sanity check)

Respuesta: "Servidor de Mocks activo. Rutas: /api/mocks, /api/users, /api/pets"

### 🐶 GET /api/mocks/mockingpets

Descripción: Devuelve un array de mascotas mock generadas dinámicamente

Query Params: qty (int ≥ 1, default: 20)

Ejemplos:

- GET /api/mocks/mockingpets

- GET /api/mocks/mockingpets?qty=10

Respuesta ejemplo:

```bash
{
  "status": "success",
  "payload": [
    {
      "name": "Valentina",
      "specie": "dog",
      "birthDate": "2025-06-03T10:00:00.000Z",
      "adopted": false
    },
    ...
  ]
}

```

Errores:

```bash
{ "error": "El parámetro qty debe ser un entero >= 1" }

```

### 👤 GET /api/mocks/mockingusers

Descripción: Devuelve un array de usuarios mock (no se guarda en DB)

Query Params: qty (int ≥ 1, default: 50)

Ejemplos:

- GET /api/mocks/mockingusers
- GET /api/mocks/mockingusers?qty=5

Respuesta ejemplo:

```bash
{
  "status": "success",
  "payload": [
    {
      "first_name": "María",
      "last_name": "González",
      "email": "maria.gonzalez@example.com",
      "password": "$2a$10$... (hash de coder123)",
      "role": "user",
      "pets": []
    },
    ...
  ]
}

```

Errores:

```bash
{ "status": "error", "message": "Invalid count value" }

```

### 🧩 POST /api/mocks/generateData

Descripción: Genera e inserta en MongoDB N usuarios y M mascotas

Headers:
Content-Type: application/json
Body ejemplo:

```bash
{
  "users": 3,
  "pets": 4
}

```

Respuesta exitosa:

```bash
{
  "status": "success",
  "message": "Created 3 users and 4 pets.",
  "data": {
    "users": [ ... ],
    "pets": [ ... ]
  }
}

```

Errores comunes:

```bash
{ "error": "users and pets must be non-negative integers" }

```

### 📋 GET /api/users

Descripción: Lista todos los usuarios reales guardados en MongoDB

Ejemplo de respuesta:

```bash
[
  {
    "_id": "64a0bf2e...",
    "first_name": "Rocío",
    "last_name": "Sánchez",
    "email": "rocio.sanchez@example.com",
    "role": "user",
    "pets": [],
    "createdAt": "2025-06-03T...",
    "updatedAt": "2025-06-03T..."
  }
]
```

### 🐕 GET /api/pets

Descripción: Lista todas las mascotas reales guardadas en MongoDB

Ejemplo de respuesta:

```bash
[
  {
    "_id": "64a0bf2e...",
    "name": "Sofía",
    "specie": "cat",
    "adopted": false,
    "createdAt": "2025-06-03T...",
    "updatedAt": "2025-06-03T..."
  }
]
```

## 🧪 Casos de prueba (curl / Postman)

### 🔍 Sanity Check

http://localhost:3000/

### 🐾 Mocking

http://localhost:3000/api/mocks/mockingpets
http://localhost:3000/api/mocks/mockingpets?qty=10

http://localhost:3000/api/mocks/mockingusers
http://localhost:3000/api/mocks/mockingusers?qty=5

### 📥 Insertar en base de datos

```bash
curl -X POST http://localhost:3000/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users":2,"pets":3}'
```

### 🧾 Verificar datos en base

```bash
curl http://localhost:3000/api/users
curl http://localhost:3000/api/pets
```

### 🚫 Pruebas con errores esperados

```bash
GET /api/mocks/mockingpets?qty=0       # → 400
GET /api/mocks/mockingusers?qty=-5     # → 400
POST /api/mocks/generateData           # → Body inválido: {"users":"cinco"} → 400
```

### 🧠 Autoría

Belén Amiune

Frontend Developer | Coderhouse Backend III

Junio 2025 – Córdoba, Argentina
