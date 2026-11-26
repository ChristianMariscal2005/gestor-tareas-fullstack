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

```text
gestor-tareas-fullstack/
│
├── backend/
│   ├── src/
│   │   ├── database/
│   │   └── tareas/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
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

Crear una base de datos MySQL llamada:

```sql
CREATE DATABASE taskflow_db;
```

La estructura de las tablas debe estar creada antes de ejecutar la aplicación.

### 3. Configurar el backend

Entrar en la carpeta:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` dentro de `backend/` con estas variables:

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