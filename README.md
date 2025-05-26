#  Práctico Integrador: React + Node.js

## Tecnologías Utilizadas

- **Frontend:**
  - [React](https://reactjs.org/)
  - [React Router DOM](https://reactrouter.com/)
  - [Axios](https://axios-http.com/)
  - [Bootstrap](https://getbootstrap.com/) (para estilos y componentes UI)

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [fs](https://nodejs.org/api/fs.html) (para manejo de archivos JSON)
  - [CORS](https://www.npmjs.com/package/cors)
  - [PDFKit](https://www.npmjs.com/package/pdfkit) (para generación de PDFs)

## 📁 Estructura del Proyecto

```
Practico_Integrador_ReactJS_NodeJS/
├── backend/
│   ├── controllers/
│   │   ├── productosController.js
│   │   └── usuariosController.js
│   ├── routes/
│   │   ├── productosRoutes.js
│   │   └── usuariosRoutes.js
│   ├── data/
│   │   ├── productos.json
│   │   └── usuarios.json
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Productos.jsx
│   │   │   └── Usuarios.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## ⚙️ Instalación y Ejecución

### 1. Clonar el Repositorio

```bash
git clone https://github.com/GeroStaffolani/Practico_Integrador_ReactJS_NodeJS.git
cd Practico_Integrador_ReactJS_NodeJS
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

#### Ejecutar el Servidor Backend

```bash
node app.js
```

El servidor estará corriendo en `http://localhost:3000/`.

### 3. Configurar el Frontend

```bash
cd ../frontend
npm install
```

#### Ejecutar la Aplicación Frontend

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`.

## Funcionalidades

### Productos

- **Listar Productos:** Visualización de todos los productos disponibles.
- **Agregar Producto:** Formulario para añadir nuevos productos.
- **Editar Producto:** Modificación de información de productos existentes.
- **Eliminar Producto:** Eliminación de productos del sistema.
- **Exportar a PDF:** Generación de un listado de productos en formato PDF.

### Usuarios

- **Listar Usuarios:** Visualización de todos los usuarios registrados.
- **Agregar Usuario:** Formulario para registrar nuevos usuarios.
- **Editar Usuario:** Modificación de información de usuarios existentes.
- **Eliminar Usuario:** Eliminación de usuarios del sistema.
- **Exportar a PDF:** Generación de un listado de usuarios en formato PDF.

## 📄 Endpoints del Backend

### Productos

- `GET /productos` - Obtener todos los productos.
- `POST /productos` - Crear un nuevo producto.
- `PUT /productos/:id` - Actualizar un producto existente.
- `DELETE /productos/:id` - Eliminar un producto.

### Usuarios

- `GET /usuarios` - Obtener todos los usuarios.
- `POST /usuarios` - Crear un nuevo usuario.
- `PUT /usuarios/:id` - Actualizar un usuario existente.
- `DELETE /usuarios/:id` - Eliminar un usuario.


## 📄 Exportación a PDF

La aplicación permite exportar los listados de productos y usuarios a archivos PDF, facilitando la generación de reportes y documentación.
