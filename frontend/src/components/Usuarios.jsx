import axios from 'axios';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import ExportarPdf from './ExportarPdf';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', edad: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:3000/usuarios').then(res => setUsuarios(res.data));
  };

  useEffect(fetchData, []);

  const handleSubmit = () => {
    if (editId) {
      axios.put(`http://localhost:3000/usuarios/${editId}`, form).then(fetchData);
    } else {
      axios.post('http://localhost:3000/usuarios', form).then(fetchData);
    }
    setForm({ nombre: '', email: '', edad: '' });
    setEditId(null);
  };

  const handleEdit = (u) => {
    setForm({ nombre: u.nombre, email: u.email, edad: u.edad });
    setEditId(u.id);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Usuarios", 20, 10);
    autoTable(doc, {
      head: [['Nombre', 'Email', 'Edad']],
      body: usuarios.map(u => [u.nombre, u.email, u.edad]),
    });
    doc.save('usuarios.pdf');
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <div className="mb-3">
        <input className="form-control mb-2" placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="form-control mb-2" placeholder="Edad" value={form.edad} onChange={e => setForm({ ...form, edad: e.target.value })} />
        <button className="btn btn-primary" onClick={handleSubmit}>
          {editId ? 'Actualizar' : 'Crear'}
        </button>
      </div>
      <table className="table table-bordered">
        <thead><tr><th>Nombre</th><th>Email</th><th>Edad</th><th>Acciones</th></tr></thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.edad}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(u)}>Editar</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => axios.delete(`http://localhost:3000/usuarios/${u.id}`).then(fetchData)}>Eliminar</button>
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

export default Usuarios;
