const router = require('express').Router()
const prisma = require('../database/prisma/client')
const {handleErr, filterNullValues} = require('../../helper/handles')
const Aluno = require('../model/Aluno')
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


router.get('/', async(req, res) => {
    let user = await Aluno(req.user.alunoId)
    
    if(user.professores.lenght < 1){
        req.flash('success','É necessário escolher um professor para usar o sistema')
        return res.redirect('/aluno/professor')
    }else{
        req.flash('success','Oi!')
        return res.render('dashboard', {user:user})
    }

})

router.get('/professor', async(req, res) => {
    let profile = req.user

    let professores = await prisma.professor.findMany({
        include : {
            profile : true
        }
    })

    res.render('aluno/professor',{profile, professores })
})

router.post('/professor', async(req, res)=>{
    const {professorId} = req.body
    
    try {
        const updateAlunoData = {
            where : {id : req.user.alunoId},
            data : {
                professores : {
                    connect : [{id : parseInt(professorId)}]
                }
            },
            include : {
                professores : true
            }
        }
        
        await prisma.aluno.update(updateAlunoData)

        req.flash('success', 'Professor adicionado!')
        res.redirect('/')
    } catch (error) {
        req.flash('fail', 'Erro ao adicionar professor!')
        res.redirect('/')
    }
    
})

router.get('/profile', async(req, res) => {
    let user = await Aluno(req.user.alunoId)

    let messages = {}

    messages.success = req.flash('success')[0] || null
    messages.fail = req.flash('fail')[0] || null

    res.render('profile',{user, messages})
})

router.post('/profile', upload.single('imagem'), async(req, res) => {
    let user = await Aluno(req.user.alunoId)

    const { nome, email, telefone, cpf, dataNascimento, novaSenha, confSenha, oldPass} = req.body

    if(!compareHash(oldPass ,user.profile.senha)) {
        req.flash('fail','Senha incorreta')
        return res.redirect('/aluno/profile')
    }

    let imagem = user.profile.image || null;

    if(req.file) imagem  = req.file.filename 

    let data = {
        nome       : nome.trim() ,
        email      : email.trim(),
        cpf        : cpf.trim(),
        telefone   : telefone.trim(),
        dataNascimento : new Date(dataNascimento),
        image : imagem
    }

    const IsNovaSenha = checkMinLength(novaSenha.trim(), 8) && isEqual(novaSenha.trim(), confSenha.trim())

    if (IsNovaSenha) data.senha = makeHash( novaSenha )

    try {
        await prisma.profile.update({
            where : {id : user.profile.id},
            data : data
        })

        req.flash('success','Perfil atualizado!')
        return res.redirect('/aluno/profile')

    } catch (error) {
        req.flash('fail','Erro ao atualizar perfil!')
        return res.redirect('/aluno/profile')
    }
})

module.exports = router