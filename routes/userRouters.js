//Preparamos os EXPRESS p mapear os ENDPOINTS
const express = require('express');
const router = express.Router();
//chamamos os métodos controladores
const UserController = require('../controllers/UserController')

router.post('/add', UserController.createUser)
router.get('/', UserController.showUser)

//Entrega a rota a aplicação
module.exports = router