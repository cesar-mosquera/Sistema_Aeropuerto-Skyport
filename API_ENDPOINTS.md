# Sistema de Gestión de Aeropuerto SkyPort

## Endpoints Disponibles

### Autenticación
- POST /api/nets/auth/register/ - Registrar nuevo usuario
- POST /api/nets/auth/login/ - Obtener token JWT
- POST /api/nets/auth/refresh/ - Refrescar token JWT

### Aerolineas (CRUD)
- GET /api/nets/aerolineas/ - Listar aerolineas
- POST /api/nets/aerolineas/ - Crear aerolínea (solo staff)
- GET /api/nets/aerolineas/{id}/ - Obtener detalles
- PUT /api/nets/aerolineas/{id}/ - Actualizar (solo staff)
- DELETE /api/nets/aerolineas/{id}/ - Eliminar (solo staff)

### Vuelos (CRUD)
- GET /api/nets/vuelos/ - Listar vuelos (filtrar por aerolinea, activo; buscar por código/destino)
- POST /api/nets/vuelos/ - Crear vuelo (solo staff)
- GET /api/nets/vuelos/{id}/ - Obtener detalles
- PUT /api/nets/vuelos/{id}/ - Actualizar (solo staff)
- DELETE /api/nets/vuelos/{id}/ - Eliminar (solo staff)

### Servicios Especiales
- POST /api/nets/equipajes/ - Calcular costo de equipajes con recargo
- GET /api/nets/pista/ - Asignar vuelos a pista

## Reglas de Negocio

### Equipajes (FOR)
- Tarifa base: $15.00
- Hasta 23kg: Sin recargo
- 23.1-32kg: Recargo $30.00
- Más de 32kg: Recargo $60.00

### Pista (WHILE)
- Asigna vuelos secuencialmente mientras caben en tiempo disponible
- Retorna tiempo libre restante

## Ejemplos de Uso en Postman

### 1. Registrarse
POST http://localhost:8000/api/nets/auth/register/
{
  "username": "admin",
  "email": "admin@skyport.com",
  "password": "Skyport123!"
}

### 2. Login
POST http://localhost:8000/api/nets/auth/login/
{
  "username": "admin",
  "password": "Skyport123!"
}

### 3. Crear Aerolínea
POST http://localhost:8000/api/nets/aerolineas/
Authorization: Bearer <TOKEN>
{
  "nombre": "LATAM"
}

### 4. Crear Vuelo
POST http://localhost:8000/api/nets/vuelos/
Authorization: Bearer <TOKEN>
{
  "aerolinea": 1,
  "codigo": "LA001",
  "destino": "Madrid",
  "duracion_minutos": 60,
  "precio_base": "250.00",
  "activo": true
}

### 5. Calcular Equipajes
POST http://localhost:8000/api/nets/equipajes/
[
  {"pasajero": "Juan Pérez", "peso": 20},
  {"pasajero": "María López", "peso": 25},
  {"pasajero": "Carlos García", "peso": 35}
]

### 6. Asignar Pista
GET http://localhost:8000/api/nets/pista/?codigo=LA001
