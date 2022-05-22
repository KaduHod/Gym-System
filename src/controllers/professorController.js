const router = require('express').Router()
const prisma = require('../database/prisma/client')
const {handleErr, filterNullValues} = require('../../helper/handles')
const Professor = require('../model/Professor')
const res = require('express/lib/response')
const multer  = require('multer')
const path = require('path');
const { getExtension, deletarArquivo } = require('../../helper/arquivos')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/storage/profiles'))
    },
    filename : (req, file, cb) => {
        cb(null,  'Profile' + '-' + Date.now() + '.' + getExtension(file.originalname))
    }
})
const upload = multer({ storage: storage})
const { compareHash, makeHash } = require('../../services/crypt')
const { isEqual, checkMinLength } = require('../../helper/validarFormHelper')





router.get('/', async(req, res)=>{
    let user = await Professor(req.user.professorId)

    messages = {}
    messages.success = req.flash('success') || null
    messages.fail = req.flash('fail') || null
    
    res.render('dashboard', {user: user, messages})
})

router.get('/aluno/listar', async(req, res)=>{
    let user = await  Professor(req.user.professorId)

    res.render('professor/alunos/listar', {user: user, alunos : user.alunos})
})

router.get('/profile', async(req, res) => {
    let user = await Professor(req.user.professorId)

    let messages = {}

    messages.success = req.flash('success')[0] || null
    messages.fail = req.flash('fail')[0] || null

    res.render('profile',{user, messages})
})

router.post('/profile', upload.single('imagem'), async(req, res) => {
    let user = await Professor(req.user.professorId)

    const { nome, email, telefone, cpf, creef, dataNascimento, novaSenha, confSenha, oldPass} = req.body

    if(!compareHash(oldPass ,user.profile.senha)) {
        req.flash('fail','Senha incorreta')
        return res.redirect('/professor/profile')
    }

    let imagem = user.profile.image || null;

    if (req.file) imagem = req.file.filename    

    let data = {
        nome       : nome.trim() ,
        email      : email.trim(),
        cpf        : cpf.trim(),
        telefone   : telefone.trim(),
        dataNascimento : new Date(dataNascimento),
        professor  : {
            update : {
                creef : creef.trim()
            }
        },
        image : imagem
    }

    const IsNovaSenha = checkMinLength(novaSenha.trim(), 8) && isEqual(novaSenha.trim(), confSenha.trim())

    if(IsNovaSenha) data.senha = makeHash( novaSenha )

    try {
        await prisma.profile.update({
            where : {id : user.profile.id},
            data : data
        })

        req.flash('success','Perfil atualizado!')
        return res.redirect('/professor/profile')

    } catch (error) {
        req.flash('fail','Erro ao atualizar perfil!')
        return res.redirect('/professor/profile')
    }
})

router.get('/profile/json', async(req, res) => {
    let user = await Professor(req.user.professorId)
    res.send(user)
})

module.exports = router