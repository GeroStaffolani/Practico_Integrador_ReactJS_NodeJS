const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando correctamente!');
});


app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
