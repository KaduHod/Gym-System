const router = require('express').Router()
const prisma = require('../database/prisma/client')
const {handleErr} = require('../../helper/handles')

router.get('/', async (req, res) => {
    // const exercicios = await prisma.exercicio.findMany()
    // res.render('Pagina de exercicios', {exercicios})
})

router.post('/', async (req, res) => {
    const exercicio = await prisma.exercicio.findMany()
    res.send(exercicio)
})

router.post('/', (req, res) => {
    res.json({'message': 'Vamos criar um exercicios'})
})

module.exports = router