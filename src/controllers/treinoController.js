const router = require('express').Router()
const Professor = require('../model/Professor')
const prisma = require('../database/prisma/client')
const logger = require('../../helper/logs')
const { Exercicios, Exercicio } = require('../model/Exercicio')
const { Treinos, Treino } = require('../model/Treino')
const { createMany } = require('../../helper/treino')



router.get('/', async(req, res) => {
    let professor = await Professor(req.user.professorId)
    let exercicios = await Exercicios()
    res.render('treinos/create', { professor, exercicios , user : professor })
})

router.post('/', async(req, res) => {
    let professor = await Professor(req.user.professorId)
    const { nome, aluno, descricao, aquecimento, exercicios, series, reps  } = req.body
    
    let treinoData = {
        data:{
            nome,
            descricao : descricao.trim(),
            aquecimento: aquecimento.trim(),
            exercicios : {
                create :  createMany({exercicios, series, reps}) 
            },
            aluno : {
                connect : {id : parseInt(aluno)}
            },
            professor : {
                connect : { id : professor.id }
            }
        }              
    }

    try {

        //Cria novo treino
        let treinoNovo = await prisma.treino.create(treinoData)
        
        req.flash('success','Treino criado!')
        res.redirect('treino/')

    } catch (error) {
        
        req.flash('fail','Falha ao criar treino!')
        res.redirect('treino/')
    }
    

})

router.get('/listar', async(req, res) => {
    let professor = await Professor(req.user.professorId)
    let treinos = await Treinos();

    messages.success = req.flash('success')[0] || null
    messages.fail = req.flash('fail')[0] || null

    res.render('treinos/list', {treinos, messages, user : professor})
})


router.get('/:id', async(req, res) => {
    let professor = await Professor(req.user.professorId)
    let id = parseInt(req.params.id)

    try {
        let treino = await Treino(id);
        res.send(treino)
        logger.info('Treino enviado')
    } catch (error) {
        logger.error(error)
    }
    


    
})

module.exports = router