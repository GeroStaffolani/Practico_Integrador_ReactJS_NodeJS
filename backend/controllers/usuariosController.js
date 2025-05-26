const fs = require('fs');
const path = './data/usuarios.json';

const getUsuarios = (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
};

const crearUsuario = (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(path));
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  fs.writeFileSync(path, JSON.stringify(usuarios, null, 2));
  res.status(201).json(nuevo);
};

const actualizarUsuario = (req, res) => {
  let usuarios = JSON.parse(fs.readFileSync(path));
  const { id } = req.params;
  usuarios = usuarios.map(u => u.id == id ? { ...u, ...req.body } : u);
  fs.writeFileSync(path, JSON.stringify(usuarios, null, 2));
  res.json({ msg: "Usuario actualizado" });
};

const eliminarUsuario = (req, res) => {
  let usuarios = JSON.parse(fs.readFileSync(path));
  usuarios = usuarios.filter(u => u.id != req.params.id);
  fs.writeFileSync(path, JSON.stringify(usuarios, null, 2));
  res.json({ msg: "Usuario eliminado" });
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
