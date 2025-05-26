import axios from "axios"
import { useEffect, useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Link } from "react-router-dom"
import "../index.css"

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [form, setForm] = useState({ nombre: "", email: "", edad: "" })
  const [editId, setEditId] = useState(null)

  const fetchData = () => {
    axios.get("http://localhost:3000/usuarios").then((res) => setUsuarios(res.data))
  }

  useEffect(fetchData, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editId) {
      axios.put(`http://localhost:3000/usuarios/${editId}`, form).then(fetchData)
    } else {
      axios.post("http://localhost:3000/usuarios", form).then(fetchData)
    }
    setForm({ nombre: "", email: "", edad: "" })
    setEditId(null)
  }

  const handleEdit = (u) => {
    setForm({ nombre: u.nombre, email: u.email, edad: u.edad })
    setEditId(u.id)
  }

  const handleCancel = () => {
    setForm({ nombre: "", email: "", edad: "" })
    setEditId(null)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text("Listado de Usuarios", 20, 10)
    autoTable(doc, {
      head: [["Nombre", "Email", "Edad"]],
      body: usuarios.map((u) => [u.nombre, u.email, u.edad]),
    })
    doc.save("usuarios.pdf")
  }

  return (
    <div className="usuarios-container">
      {/* Header */}
      <div className="usuarios-header">
        <h4>Gestión de Usuarios</h4>
      </div>

      {/* Formulario */}
      <div className="usuarios-form-section">
        <form onSubmit={handleSubmit} className="usuarios-form">
          <div className="form-title">
            <h3>{editId ? "Editar Usuario" : "Nuevo Usuario"}</h3>
          </div>

          <div className="form-inputs-usuarios">
            <div className="input-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                id="nombre"
                type="text"
                className="form-input"
                placeholder="Nombre Completo"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Correo Electrónico"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="edad">Edad</label>
              <input
                id="edad"
                type="number"
                min="1"
                max="120"
                className="form-input"
                placeholder="Edad"
                value={form.edad}
                onChange={(e) => setForm({ ...form, edad: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-crear">
              {editId ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
            {editId && (
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla de usuarios */}
      <div className="usuarios-table-section">
        <div className="table-header">
          <h3>Lista de Usuarios ({usuarios.length})</h3>
        </div>

        <div className="table-container">
          <table className="table table-bordered usuarios-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((u) => (
                  <tr key={u.id} className={editId === u.id ? "editing-row" : ""}>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>{u.edad} años</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(u)}
                          disabled={editId && editId !== u.id}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => axios.delete(`http://localhost:3000/usuarios/${u.id}`).then(fetchData)}
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
                  <td colSpan="4" className="no-users">
                    No hay usuarios registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botones de acción separados */}
      <div className="usuarios-actions">
        <div className="export-section">
          <button className="btn-export" onClick={exportPDF} disabled={usuarios.length === 0}>
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
  )
}

export default Usuarios
