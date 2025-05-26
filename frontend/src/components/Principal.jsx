import React from "react";
import { Link } from "react-router-dom";

const Principal = () => {
  return (
    <div>
      <h2>Bienvenido al Gestor de Productos</h2>
      <div className="mt-3">
        <Link to="/productos" className="btn btn-primary m-2">Productos</Link>
        <Link to="/usuarios" className="btn btn-secondary m-2">Usuarios</Link>
      </div>
    </div>
  );
};

export default Principal;
