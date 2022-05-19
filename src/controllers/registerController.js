const { handleErr, handleNullValue, filterNullValues } = require('../../helper/handles')
const { compareHash, makeHash } = require('../../services/crypt')
const prisma = require('../database/prisma/client')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('register/register')
})

router.post('/', async(req, res) => {
    const {nome, senha, cpf, email, telefone, dataNascimento } = filterNullValues(req.body)

    const dataProfile = {
        nome,
        senha : makeHash(senha),
        cpf : cpf || null,
        email : email.toLowerCase(),
        telefone,
        dataNascimento : new Date(dataNascimento) || null,
        type : null,
        aluno : undefined,
        professor : undefined
    }
    
    try {
        const newUser = await prisma.profile.create({data: dataProfile})

        res.render('register/type', {user : newUser})

    } catch (error) {
        handleErr(error, res, 'Erro ao criar profile')
    }
    
})

router.get('/:id/:type', async(req, res) => {
    const {id, type} = req.params
    let message;
    if(type == 'aluno'){
        const newAluno = await prisma.profile.update({
            where : {id : parseInt(id)},
            data : {
                aluno : {
                    create : {}
                },
                type: 'aluno'
            }
     
        })
        message = 'Perfil de aluno criado'
    }

    if(type == 'professor'){
        const newProfessor = await prisma.profile.update({
            where : {id : parseInt(id)},
            data : {
                professor : {
                    create : {}
                },
                type: 'professor'
            }
        })
        message = 'Perfil de professor criado'
    }

    res.render('login/login', {message: message})

    console.log({id, type})
})

module.exports = router