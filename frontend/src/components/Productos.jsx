import axios from 'axios';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import ExportarPdf from './ExportarPdf';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:3000/productos').then(res => setProductos(res.data));
  };

  useEffect(fetchData, []);

  const handleSubmit = () => {
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
    <div>
      <h2>Productos</h2>
      <div className="mb-3">
        <input className="form-control mb-2" placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
        <input className="form-control mb-2" placeholder="Precio" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
        <button className="btn btn-primary" onClick={handleSubmit}>
          {editId ? 'Actualizar' : 'Crear'}
        </button>
      </div>
      <table className="table table-bordered">
        <thead><tr><th>Nombre</th><th>Precio</th><th>Acciones</th></tr></thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>Editar</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => axios.delete(`http://localhost:3000/productos/${p.id}`).then(fetchData)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            <button className="btn btn-secondary mt-3" onClick={exportPDF}>Exportar PDF</button>
      <Link to="/" className="btn btn-outline-primary mt-3 ml-2">
        Inicio
      </Link>

    </div>
  );
};

export default Productos;
