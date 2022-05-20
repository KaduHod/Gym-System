const router = require('express').Router()
const prisma = require('../database/prisma/client')

router.get('/', (req, res) => {
    res.send('listar treinos')
})

router.get('/criar', (req, res) => {
    
    res.render('treinos/create')
})

router.post('/', (req, res) => {
    res.json({'message': 'Vamos criar um treino'})
})

module.exports = router