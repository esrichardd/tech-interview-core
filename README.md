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

### Descripción de Módulos

### Games

- **Descripción**: Maneja toda la lógica relacionada con los juegos.
- **Estructura**:
    - `games.module.ts`: Define el módulo `Games`.
    - `controllers/games.controller.ts`: Controlador que maneja las rutas y solicitudes relacionadas con los juegos.
    - `services/games.service.ts`: Servicio que contiene la lógica de negocio para los juegos.
    - `services/game-events.service.ts`: Servicio que maneja eventos relacionados con los juegos.
    - `entities/game.entity.ts`: Define la entidad `Game`.
    - `entities/game-event.entity.ts`: Define la entidad `GameEvent`.

### Teams

- **Descripción**: Maneja toda la lógica relacionada con los equipos.
- **Estructura**:
    - `teams.module.ts`: Define el módulo `Teams`.
    - `controllers/teams.controller.ts`: Controlador que maneja las rutas y solicitudes relacionadas con los equipos.
    - `services/teams.service.ts`: Servicio que contiene la lógica de negocio para los equipos.
    - `entities/team.entity.ts`: Define la entidad `Team`.

### Tournaments

- **Descripción**: Maneja toda la lógica relacionada con los torneos.
- **Estructura**:
    - `tournaments.module.ts`: Define el módulo `Tournaments`.
    - `controllers/tournaments.controller.ts`: Controlador que maneja las rutas y solicitudes relacionadas con los torneos.
    - `controllers/groups.controller.ts`: Controlador que maneja las rutas y solicitudes relacionadas con los grupos.
    - `services/tournaments.service.ts`: Servicio que contiene la lógica de negocio para los torneos.
    - `services/groups.service.ts`: Servicio que contiene la lógica de negocio para los grupos.
    - `entities/tournament.entity.ts`: Define la entidad `Tournament`.
    - `entities/group.entity.ts`: Define la entidad `Group`.
    - `entities/group-team.entity.ts`: Define la entidad `GroupTeam`.
    - `entities/stage.entity.ts`: Define la entidad `Stage`.
    - `entities/game.entity.ts`: Define la entidad `Game`.

### Users

- **Descripción**: Maneja toda la lógica relacionada con los usuarios.
- **Estructura**:
    - `users.module.ts`: Define el módulo `Users`.
    - `controllers/users.controller.ts`: Controlador que maneja las rutas y solicitudes relacionadas con los usuarios.
    - `services/users.service.ts`: Servicio que contiene la lógica de negocio para los usuarios.
    - `services/favorite-game.service.ts`: Servicio que maneja la lógica de los juegos favoritos de los usuarios.
    - `services/favorite-tournament.service.ts`: Servicio que maneja la lógica de los torneos favoritos de los usuarios.
    - `entities/user.entity.ts`: Define la entidad `User`.
    - `entities/favorite-game.entity.ts`: Define la entidad `FavoriteGame`.
    - `entities/favorite-team.entity.ts`: Define la entidad `FavoriteTeam`.
    - `entities/favorite-tournament.entity.ts`: Define la entidad `FavoriteTournament`.

### Descripción de Librerías

### Utils

- **Descripción**: Contiene utilidades generales y funciones auxiliares que pueden ser reutilizadas en diferentes partes de la aplicación.
- **Estructura**: Código utilitario compartido.

### Redis

- **Descripción**: Maneja la integración y operaciones relacionadas con Redis.
- **Estructura**: Código para interactuar con Redis.

### Persistence

- **Descripción**: Contiene la lógica relacionada con la persistencia de datos, como repositorios y configuraciones de bases de datos.
- **Estructura**: Código para la persistencia de datos.

### Logger

- **Descripción**: Maneja el registro y la gestión de logs en la aplicación.
- **Estructura**: Código para el manejo de logs.

### Healthcheck

- **Descripción**: Contiene lógica para realizar health checks de la aplicación.
- **Estructura**: Código para health checks.

### Event-Broker

- **Descripción**: Maneja la lógica relacionada con la mensajería y el broker de eventos.
- **Estructura**: Código para la mensajería y eventos.

### SDK-Gateway-DTO

- **Descripción**: Contiene los Data Transfer Objects (DTOs) y SDKs para la comunicación con otros servicios.
- **Estructura**: Código para DTOs y SDKs.

### Dockerfile

- **Descripción**: Archivo de configuración de Docker para construir la imagen de la aplicación.
- **Estructura**: Instrucciones para construir y configurar el contenedor Docker.

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