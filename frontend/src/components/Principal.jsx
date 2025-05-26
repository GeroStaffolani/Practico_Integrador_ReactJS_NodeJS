// import React from "react";
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../index.css";

// const Principal = () => {
//   return (
//     <div>
//       <h2>Bienvenido al Gestor de Usuarios y Productos</h2>
//       <div className="rutas-botones">
//         <Link to="/productos" className="btn btn-primary m-2">Productos</Link>
//         <Link to="/usuarios" className="btn btn-primary m-2">Usuarios</Link>
//       </div>
//     </div>
//   );
// };

// export default Principal;


import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../index.css"


const Principal = () => {
  return (
    <div className="principal-container">
      <div className="principal-header">
        <h2>Bienvenido al Gestor de Usuarios y Productos</h2>
      </div>

      <div className="principal-grid">
        <Link to="/productos" className="principal-card-link">
          <div className="principal-card">
            <div className="card-image">
              <img src="../public/productos.png" alt="Productos" />
            </div>
            <h5 className="card-title">Productos</h5>
            <p className="card-description">Gestiona tu inventario de productos</p>
          </div>
        </Link>

        <Link to="/usuarios" className="principal-card-link">
          <div className="principal-card">
            <div className="card-image">
              <img src="../public/user.png" alt="Usuarios" />
            </div>
            <h5 className="card-title">Usuarios</h5>
            <p className="card-description">Administra los usuarios del sistema</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Principal

