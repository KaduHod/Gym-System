const router = require('express').Router()
const prisma = require('../database/prisma/client')
const { handleErr } = require('../../helper/handles')
const multer  = require('multer')
const path = require('path');
const { getExtension, deletarArquivo } = require('../../helper/arquivos')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/storage/exercicios'))
    },
    filename : (req, file, cb) => {
        cb(null,  'Exercicio' + '-' + Date.now() + '.' + getExtension(file.originalname))
    }
})
const upload = multer({ storage: storage})
const Professor = require('../model/Professor')
const { Exercicios, Exercicio } = require('../model/Exercicio');

router.get('/listar', async(req, res)=>{
    let user = await Professor(req.user.professorId)
    let exercicios = await Exercicios()

    let messages = {}

    messages.success = req.flash('success')[0] || null
    messages.fail = req.flash('fail')[0] || null
    
    res.render('exercicios/listar', { exercicios, messages, user})
})


router.get('/', async (req, res) => {
    let user = await Professor(req.user.professorId)
    res.render('exercicios/create', {user})
})

router.post('/', upload.single('imagem') ,async (req, res) => {
    const {nome, descricao} = req.body

    let imagem = null;

    if(req.file) imagem = req.file.filename  
    
    try {
        await prisma.professor.update({
            where : {id : req.user.professorId},
            data : {
                exercicios : {
                    create : {
                        nome,
                        descricao,
                        imagem : imagem || null
                    }
                }
            }
        })

        req.flash('success', 'Exercício criado!')
        res.redirect('/exercicio/listar') 
    } catch (error) {
        req.flash('fail', 'Erro ao criar exercício!')
        res.redirect('/exercicio/listar') 
    }

})



router.get('/delete/:id/:filename', async(req, res)=>{
    const { id , filename} = req.params
    
    try {
        await prisma.exercicio.delete({where:{id:parseInt(id)}})

        if(filename !== 'false') deletarArquivo('exercicios',filename)

        req.flash('success', 'Exercício excluído!')
        res.redirect('/exercicio/listar')
    } catch (error) {
        
        req.flash('fail', 'Erro ao excluir exercício!')
        res.redirect('/exercicio/listar')
    }
})
router.get('/edit/:id' , async(req, res)=>{
    const { id } = req.params
    let user = await Professor(req.user.professorId)
    try {
        const exercicio = await Exercicio(parseInt(id))
        res.render('exercicios/edit', {exercicio, user})
    } catch (error) {
        handleErr(error, res, 'Erro ao renderizar view de editar exercício')
    }    
})

router.post('/edit/:id', upload.single('imagem') ,async (req, res) => {
    const id = parseInt(req.params.id)
    const {nome, descricao} = req.body
    const exercicio = await prisma.exercicio.findUnique({where: {id : id}})

    let imagem = null;

    try {

        if(req.file) {
            imagem = req.file.filename 
    
            deletarArquivo('exercicios',exercicio.imagem)
        }

        await prisma.exercicio.update({
            where : {id : id},
            data : {
                nome,
                descricao,
                imagem : imagem || exercicio.imagem
            }
        })

        req.flash('success', 'Exercício editado!')
        res.redirect('/exercicio/listar')

    } catch (error) {

        req.flash('fail', 'Erro ao editar exercício!')
        res.redirect('/exercicio/listar') 
    }

})

module.exports = router