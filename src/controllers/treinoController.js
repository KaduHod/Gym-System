const router = require('express').Router()
const Professor = require('../model/Professor')
const { Exercicios, Exercicio } = require('../model/Exercicio')
const prisma = require('../database/prisma/client')

router.get('/', async(req, res) => {
    let professor = await Professor(req.user.professorId)
    let exercicios = await Exercicios()
    res.render('treinos/create', {professor, exercicios, user : professor})
})

router.post('/', (req, res) => {
    res.json({'message': 'Vamos criar um treino'})
})

module.exports = router