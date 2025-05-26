import axios from 'axios';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import ExportarPdf from './ExportarPdf';
import "../index.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:3000/productos').then(res => setProductos(res.data));
  };

  useEffect(fetchData, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      axios.put(`http://localhost:3000/productos/${editId}`, form).then(fetchData);
    } else {
      axios.post('http://localhost:3000/productos', form).then(fetchData);
    }
    setForm({ nombre: '', precio: '' });
    setEditId(null);
  };

  const handleEdit = (p) => {
    setForm({ nombre: p.nombre, precio: p.precio });
    setEditId(p.id);
  };

  const handleCancel = () => {
    setForm({ nombre: '', precio: '' });
    setEditId(null);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Productos", 20, 10);
    autoTable(doc, {
      head: [['Nombre', 'Precio']],
      body: productos.map(p => [p.nombre, p.precio]),
    });
    doc.save('productos.pdf');
  };

  return (
    <div className="productos-container">
      {/* Header */}
      <div className="productos-header">
        <h2>Gestión de Productos</h2>
      </div>

      {/* Formulario */}
      <div className="productos-form-section">
        <form onSubmit={handleSubmit} className="productos-form">
          <div className="form-title">
            <h3>{editId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
          </div>
          
          <div className="form-inputs">
            <div className="input-group">
              <label htmlFor="nombre">Nombre del Producto</label>
              <input 
                id="nombre"
                type="text"
                className="form-input" 
                placeholder="Producto" 
                value={form.nombre} 
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="precio">Precio</label>
              <input 
                id="precio"
                type="number"
                step="0.01"
                className="form-input" 
                placeholder="Precio" 
                value={form.precio} 
                onChange={e => setForm({ ...form, precio: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-crear">
              {editId ? 'Actualizar' : 'Crear Producto'}
            </button>
            {editId && (
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla de productos */}
      <div className="productos-table-section">
        <div className="table-header">
          <h3>Lista de Productos ({productos.length})</h3>
        </div>
        
        <div className="table-container">
          <table className="table table-bordered productos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map(p => (
                  <tr key={p.id} className={editId === p.id ? 'editing-row' : ''}>
                    <td>{p.nombre}</td>
                    <td>${parseFloat(p.precio).toFixed(2)}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-warning btn-sm" 
                          onClick={() => handleEdit(p)}
                          disabled={editId && editId !== p.id}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn btn-danger btn-sm" 
                          onClick={() => axios.delete(`http://localhost:3000/productos/${p.id}`).then(fetchData)}
                          disabled={editId}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-products">
                    No hay productos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botones de acción separados */}
      <div className="productos-actions">
        <div className="export-section">
          <button 
            className="btn-export" 
            onClick={exportPDF}
            disabled={productos.length === 0}
          >
            Exportar PDF
          </button>
        </div>
        
        <div className="navigation-section">
          <Link to="/" className="btn-home">
             Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Productos;
