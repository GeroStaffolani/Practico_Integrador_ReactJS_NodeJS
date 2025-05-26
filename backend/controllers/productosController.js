const fs = require('fs');
const path = './data/productos.json';

const getProductos = (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
};

const crearProducto = (req, res) => {
  const productos = JSON.parse(fs.readFileSync(path));
  const nuevo = { id: Date.now(), ...req.body };
  productos.push(nuevo);
  fs.writeFileSync(path, JSON.stringify(productos, null, 2));
  res.status(201).json(nuevo);
};

const actualizarProducto = (req, res) => {
  let productos = JSON.parse(fs.readFileSync(path));
  const { id } = req.params;
  productos = productos.map(p => p.id == id ? { ...p, ...req.body } : p);
  fs.writeFileSync(path, JSON.stringify(productos, null, 2));
  res.json({ msg: "Producto actualizado" });
};

const eliminarProducto = (req, res) => {
  let productos = JSON.parse(fs.readFileSync(path));
  productos = productos.filter(p => p.id != req.params.id);
  fs.writeFileSync(path, JSON.stringify(productos, null, 2));
  res.json({ msg: "Producto eliminado" });
};

module.exports = {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
