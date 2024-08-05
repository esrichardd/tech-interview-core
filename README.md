# Tech Interview Core

`tech-interview-core` es un módulo de aplicación desarrollado con NestJS. Este módulo proporciona varias funcionalidades relacionadas con la gestión de usuarios y partidos.

## Información General

- **Puerto**: 3002
- **Base de Datos**: Inicializa mediante un endpoint externo

## Estructura del Proyecto
```
tech-interview-core
├── src
│   ├── main.ts
│   ├── games
│   ├── teams
│   ├── tournaments
│   └── users
├── libs
│   ├── utils
│   ├── redis
│   ├── persistence
│   ├── logger
│   ├── healthcheck
│   ├── event-broker
│   └── sdk-gateway-dto
└── Dockerfile
```
### Estructura de archivos de los módulos

### Games

```
games
├── games.module.ts
├── controllers
│   └── games.controller.ts
├── services
│   ├── games.service.ts
│   └── game-events.service.ts
├── entities
│   └── game.entity.ts

```

- **Descripción**: Maneja la lógica relacionada con los juegos, incluyendo controladores, servicios y entidades.

### Teams

```
teams
├── teams.module.ts
├── controllers
│   └── teams.controller.ts
├── services
│   └── teams.service.ts
├── entities
│   └── team.entity.ts

```

- **Descripción**: Gestiona la lógica de los equipos, controladores, servicios y entidades.

### Tournaments

```
tournaments
├── tournaments.module.ts
├── controllers
│   ├── tournaments.controller.ts
│   └── groups.controller.ts
├── services
│   ├── tournaments.service.ts
│   └── groups.service.ts
├── entities
│   ├── tournament.entity.ts
│   ├── group.entity.ts
│   ├── group-team.entity.ts
│   ├── stage.entity.ts
│   └── game.entity.ts

```

- **Descripción**: Maneja la lógica de los torneos, incluyendo controladores, servicios y entidades para torneos y grupos.

### Users

```
users
├── users.module.ts
├── controllers
│   └── users.controller.ts
├── services
│   ├── users.service.ts
│   ├── favorite-game.service.ts
│   └── favorite-tournament.service.ts
├── entities
│   ├── user.entity.ts
│   ├── favorite-game.entity.ts
│   ├── favorite-team.entity.ts
│   └── favorite-tournament.entity.ts

```

- **Descripción**: Maneja la lógica relacionada con los usuarios, controladores, servicios y entidades para usuarios y sus favoritos.

## Inicialización de la Base de Datos

Antes de usar el módulo, debes inicializar la base de datos. Para ello, realiza una solicitud al siguiente endpoint:

```bash
curl --location --request POST 'http://localhost:3003/initialize'
```

Este comando configura toda la información necesaria de torneos, equipos y partidos de la Liga Italiana en la base de datos.

## Operaciones Disponibles

### Crear Usuario
Para crear un nuevo usuario, puedes utilizar el siguiente comando `curl`. Asegúrate de reemplazar los valores del JSON con los datos del usuario que deseas crear:

```bash
curl -X POST http://localhost:3002/users \
     -H "Content-Type: application/json" \
     -d '{
           "name": "nuevo_usuario",
           "email": "usuario@example.com"
         }'
```

### Obtener Torneo y Temporada
Para obtener el torneo y la temporada de la liga italiana, utiliza el siguiente comando `curl`:

```bash
curl --location 'localhost:3002/tournaments/groups'
```

## Obtener Todos los Partidos de una Temporada
Para obtener todos los partidos de una temporada, utiliza el siguiente comando `curl`. Asegúrate de reemplazar `temporada` con el año de la temporada que deseas obtener:

```bash
curl --location 'localhost:3002/groups/:groupId/games'
```

### Obtener Partidos por Día de una Temporada
Para obtener partidos de un día específico, utiliza el siguiente comando `curl`. Reemplaza `YYYY-MM-DD` con la fecha deseada en formato ISO:

```bash
curl -X GET http://localhost:3002/groups/:groupId/games?date=YYYY-MM-DD
```

### Agregar Partido a Favoritos
Para agregar un partido a los favoritos de un usuario, utiliza el siguiente comando `curl`. Asegúrate de reemplazar `userId` con el ID del usuario y `matchId` con el ID del partido que deseas agregar:

```bash
curl --location 'localhost:3002/users/favorite-game' \
--header 'Content-Type: application/json' \
--data '{
    "userId": ":userId",
    "gameId": ":gameId"
}'
```

### Mostrar partidos favoritos
Para obtener los partidos favoritos de un usuario, utiliza el siguiente comando `curl`. Asegúrate de reemplazar `userId` con el ID del usuario:

```bash
curl --location 'localhost:3002/users/:userId/favorite-games'
```

### Agregar Torneo a Favoritos
Para agregar un torneo a los favoritos de un usuario, utiliza el siguiente comando `curl`. Asegúrate de reemplazar `userId` con el ID del usuario y `tournamentId` con el ID del torneo que deseas agregar:

```bash
curl --location 'localhost:3002/users/favorite-tournament' \
--header 'Content-Type: application/json' \
--data '{
    "userId": ":userId",
    "tournamentId": ":tournamentId"
}'
```

### Mostrar torneos favoritos
Para obtener los torneos favoritos de un usuario, utiliza el siguiente comando `curl`. Asegúrate de reemplazar `userId` con el ID del usuario:

```bash
curl --location 'localhost:3002/users/08064aed-aa62-4aae-b8ab-0b6fb24947c9/favorite-tournaments'
```

## Contacto

Para cualquier pregunta o problema, puedes contactarme en espinozar1994@gmail.com