const { profile } = require('console')
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
        type,
        cpf,
        telefone,
        email : email.toLowerCase(),
        senha : makeHash(senha),
        dataNascimento : new Date(dataNascimento) || null,
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

    let data = { type }

    type === 'aluno' ? data.aluno = { create : {} } : data.professor = { create : {} }

    try {
        await prisma.profile.update({
            where : {id : parseInt(id)},
            data
        })

        messages.success = 'Tipo de perfil cadastrado com sucesso!'

        res.render('login/login', {messages})

    } catch (error) {
        console.log(error)

        req.flash('fail', 'Erro ao cadastrar tipo de perfil! Tente novamente Mais Tarde')

        backURL = req.header('Referer') || '/'

        res.redirect( backURL, {messages})
    }
    

    
})

module.exports = router