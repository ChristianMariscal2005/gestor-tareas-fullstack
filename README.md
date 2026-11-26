# gestor-tareas-fullstack
gestor de tareas Full Stack con React, NestJS y MySQL

# TaskFlow — Gestor de tareas Full Stack

TaskFlow es una aplicación web de gestión de tareas desarrollada como proyecto Full Stack. Permite organizar actividades, administrar su estado y prioridad, y mantener la información almacenada en una base de datos MySQL.

## Tecnologías utilizadas

**Frontend**
- React 19
- Vite 8
- JavaScript
- CSS

**Backend**
- NestJS 12
- TypeScript
- Node.js
- class-validator
- mysql2

**Base de datos**
- MySQL 8

## Funcionalidades

- Crear nuevas tareas.
- Consultar las tareas registradas.
- Editar tareas existentes.
- Eliminar tareas.
- Cambiar el estado de las tareas.
- Asignar prioridades: Baja, Media y Alta.
- Establecer fechas límite.
- Filtrar y buscar tareas.
- Visualizar estadísticas de las tareas.

## Estructura del proyecto

```gestor-tareas-fullstack/
│
├── backend/
│   ├── src/
│   │   ├── database/
│   │   └── tareas/
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── database.sql
├── .gitignore
└── README.md
```

## Requisitos previos

Antes de ejecutar el proyecto necesitas tener instalado:

- Node.js y npm.
- MySQL 8.
- Git.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChristianMariscal2005/gestor-tareas-fullstack.git
```

Entrar en la carpeta:

```bash
cd gestor-tareas-fullstack
```


### 2. Configurar la base de datos

TaskFlow utiliza MySQL 8.

El proyecto incluye el archivo `database.sql`, que contiene:

- La creación de la base de datos `taskflow_db`.
- La creación de las tablas `usuarios` y `tareas`.
- La relación entre usuarios y tareas.
- Un usuario inicial para realizar pruebas.

Para configurar la base de datos:

1. Abre MySQL Workbench.
2. Abre el archivo `database.sql`.
3. Ejecuta todo el script.

El script creará la estructura necesaria para ejecutar TaskFlow.

### 3. Configurar el backend

Entrar en la carpeta:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Copia el archivo `.env.example` y crea un archivo `.env` dentro de `backend/`.

Configura las credenciales correspondientes a tu instalación de MySQL.

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=taskflow_db
```

Iniciar el servidor:

```bash
npm run start:dev
```

El backend estará disponible en:

`http://localhost:3000`

### 4. Configurar el frontend

Abrir otra terminal y entrar en:

```bash
cd gestor-tareas-fullstack/frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar el frontend:

```bash
npm run dev
```

Vite mostrará la dirección local donde podrás abrir la aplicación, normalmente:

`http://localhost:5173`

## API

El backend proporciona una API REST para administrar las tareas.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/tareas` | Obtener tareas |
| POST | `/tareas` | Crear una tarea |
| PATCH | `/tareas/:id` | Actualizar una tarea |
| DELETE | `/tareas/:id` | Eliminar una tarea |

## Autor

Desarrollado como proyecto personal de aprendizaje y portafolio Full Stack.

**GitHub:** [ChristianMariscal2005](https://github.com/ChristianMariscal2005)