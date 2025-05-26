const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuariosController');

router.get('/', ctrl.getUsuarios);
router.post('/', ctrl.crearUsuario);
router.put('/:id', ctrl.actualizarUsuario);
router.delete('/:id', ctrl.eliminarUsuario);

module.exports = router;
