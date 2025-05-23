
# 🛍️ Melash - Sistema de Gestión de Ventas

Este es un sistema web desarrollado para **Melash**, una microempresa dedicada a la venta de ropa. La aplicación permite gestionar ventas de forma eficiente, incluyendo funciones para registrar, listar, editar y eliminar ventas, con soporte para notificaciones interactivas y modo oscuro. 

## 🌐 Tecnologías Utilizadas

### 🖥️ Frontend
- **React** (Vite)
- **Axios** – Consumo de la API
- **Bootstrap 5** – Estilos con soporte para modo oscuro
- **React Router DOM** – Navegación entre rutas

### 🛠️ Backend
- **Node.js** + **Express**
- **SQLite** – Base de datos ligera
- **Sequelize** – ORM para manejo de base de datos
- **Swagger UI** – Documentación de la API REST
- **Nodemon** – Reinicio automático del servidor en desarrollo

## 📁 Estructura del Proyecto

```
melash-ventas/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── db.js
│   ├── swagger.js            # Documentación Swagger
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormularioVenta.js
│   │   │   └── ListaVentas.js
│   │   └── App.js
|   |   └── index.js
│   └── public/
|   |   └── index.html
└── README.md
```

## ⚙️ Instalación del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/j14sierra/ventas-app.git
cd melash-ventas
```

### 2. Instalar dependencias

#### Frontend

```bash
cd frontend
npm install
npm start
```
- Accede a la interfaz en: `http://localhost:3000`

#### Backend

```bash
cd ../backend
npm install
node index.js
```

- Accede a la API en: `http://localhost:4000/api/ventas`
- Accede a la documentación Swagger en: `http://localhost:4000/api-docs`



## 🧩 Funcionalidades del Sistema

✅ Registrar ventas  
✅ Listar ventas  
✅ Editar información de ventas  
✅ Eliminar con confirmación (modal interactivo)  
✅ Notificaciones personalizadas con Bootstrap  
✅ Modo oscuro compatible  
✅ Documentación completa con Swagger  
✅ Persistencia de datos con SQLite

## 🔍 Documentación de la API (Swagger)

Disponible en:  
🔗 `http://localhost:4000/api-docs`

La API está documentada con Swagger e incluye rutas como:

- `GET /api/ventas` – Listar ventas
- `POST /api/ventas` – Crear una venta
- `PUT /api/ventas/:id` – Actualizar venta
- `DELETE /api/ventas/:id` – Eliminar venta

## 📊 Base de Datos

- Base de datos **SQLite** para almacenamiento local.
- Gestionada mediante el ORM **Sequelize**.

## 🚧 Próximas Funcionalidades

- Filtro por fechas
- Reporte de ventas en PDF
- Exportación de datos
- Panel de administración con autenticación
- Estadísticas gráficas de ventas

## 👨‍💻 Autor

**Johan Camilo Sierra**  
Estudiante de Ingeniería en Desarrollo de Software  
Corporación Universitaria Iberoamericana

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente.
