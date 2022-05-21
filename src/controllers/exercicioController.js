const router = require('express').Router()
const prisma = require('../database/prisma/client')
const {handleErr} = require('../../helper/handles')
const multer  = require('multer')
const path = require('path');
const { getExtension, deletarArquivo } = require('../../helper/arquivos')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../storage/exercicios'))
    },
    filename : (req, file, cb) => {
        cb(null,  'Exercicio' + '-' + Date.now() + '.' + getExtension(file.originalname))
    }
})
const upload = multer({ storage: storage})
const Professor = require('../model/Professor')
const { Exercicios } = require('../model/Exercicio');
const res = require('express/lib/response');
const { handle } = require('express/lib/application');


router.get('/listar', async(req, res)=>{
    let exercicios = await Exercicios()

    let messages = {}

    messages.success = req.flash('success')[0] || null
    messages.fail = req.flash('fail')[0] || null
    
    res.render('exercicios/listar', {exercicios : exercicios, messages:messages})
})


router.get('/', async (req, res) => {
    res.render('exercicios/create')
})

router.post('/', upload.single('imagem') ,async (req, res) => {
    const {nome, descricao} = req.body

    let imagem = null;

    if(req.file){
        console.log('aqui')
        imagem  = req.file.filename 
    }   
    
    try {
        const createExercicio = await prisma.professor.update({
            where : {id : req.user.professorId},
            data : {
                exercicios : {
                    create : {
                        nome : nome,
                        descricao : descricao,
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
        const del = await prisma.exercicio.delete({where:{id:parseInt(id)}})

        if(filename !== 'false') deletarArquivo('exercicios',filename)

        req.flash('success', 'Exercício excluído!')
        res.redirect('/exercicio/listar')
    } catch (error) {
        
        req.flash('fail', 'Erro ao excluir exercício!')
        res.redirect('/exercicio/listar')
    }
})
router.get('/edit/:id' , async(req, res)=>{
    res.send('editar')
})

module.exports = router