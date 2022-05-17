const handleErr = require('../../helper/consoleError')
const router = require('express').Router()
const prisma = require('../database/prisma/client')


router.get('/', async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany()

        res.send(alunos)
    } catch (error) {
        handleErr( error, res, 'Erro ao listar alunos' )
    }
})

router.post('/', async (req, res) => {
    const { nome, email, cpf, professorId } = req.body

    const data = {
        nome,
        email,
        cpf,
        professorId
    }

    try {
        await prisma.aluno.create({data})
        res.json({'message': 'Aluno criado'})
    } catch (error) {
        handleErr( error, res, 'Erro ao criar Aluno' )
    }
})

router.get('/getProfessor', async (req, res) => {
    try {

        const {id} = req.body

        const alunoOptions = {
            where : {id : id},
            include: {
                professor: true
            }
        }

        const aluno = await prisma.aluno.findUnique(alunoOptions)

        res.send(aluno.professor)

        console.log(aluno)
    } catch (error) {
        handleErr( error, res, 'Erro ao requisitar professor de aluno' )
    }
})

module.exports = router