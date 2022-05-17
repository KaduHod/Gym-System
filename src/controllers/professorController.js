const router = require('express').Router()
const prisma = require('../database/prisma/client')
const handleErr = require('../../helper/consoleError')


router.get('/', async (req, res) => {
    try {
        const professores = await prisma.professor.findMany()

        res.send(professores)
    } catch (error) {
        handleErr( error, res, 'Erro ao listar professores' )
    }
})

router.post('/', async (req, res) => {

    const { nome, email, dataNascimento } = req.body

    const data = {
        nome,
        email
    }

    try {
        await prisma.professor.create({data})
        res.json({'message': 'Professor criado'})
    } catch (error) {
        handleErr( error, res, 'Erro ao criar professor' )
    }
        
})

router.get('/getAluno', async (req, res) => {
    try {

        const {id} = req.body

        const professorOptions = {
            where : {id : id},
            include: {
                alunos: true
            }
        }

        const professor = await prisma.professor.findUnique(professorOptions)

        res.send(professor.alunos)

        console.log(professor)
    } catch (error) {
        handleErr( error, res, 'Erro ao requisitar aluno de professor' )
    }
})

module.exports = router