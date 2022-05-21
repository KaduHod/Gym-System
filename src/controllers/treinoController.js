const router = require('express').Router()
const Professor = require('../model/Professor')
const prisma = require('../database/prisma/client')

router.get('/', async(req, res) => {
    
    let user = 'oi' /* await Professor(req.user.professorId)
 */
    
    res.render('treinos/create', {user: user})
})

router.post('/', (req, res) => {
    res.json({'message': 'Vamos criar um treino'})
})

module.exports = router