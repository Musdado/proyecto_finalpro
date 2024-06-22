const express = require("express");
const { getusers, createuser, getspecuser, updateuser, deleteuser, loginuser } = require("../controllers/users");
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.route('/')
    .get(authenticateToken, getusers) // Protegido
    .post(createuser); // Público, para crear nuevos usuarios

router.route('/:id')
    .get(authenticateToken, getspecuser) // Protegido
    .patch(authenticateToken, updateuser) // Protegido
    .delete(authenticateToken, deleteuser); // Protegido

router.post('/login', loginuser); // Ruta para autenticación y generación de tokens

module.exports = router;