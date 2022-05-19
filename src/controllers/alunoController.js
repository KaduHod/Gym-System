const router = require('express').Router()
const prisma = require('../database/prisma/client')
const { makeHash } = require('../../services/crypt')
const { cadastrarAluno } = require('../../events/register')
const {handleErr, filterNullValues} = require('../../helper/handles')
const Aluno = require('../model/Aluno')


router.get('/', async(req, res) => {
    let user = await Aluno(req.user.alunoId)

    console.log(user)

    if(user.professores.lenght == 0){
        return res.redirect('/aluno/professor')
    }else{
        return res.send('cadastro de aluno finalizado!')
    }

})

router.get('/professor', async(req, res) => {
    let profile = req.user
    let professores = await prisma.professor.findMany({
        include : {
            profile : true
        }
    })

    res.render('aluno/professor',{profile: profile, professores: professores })
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
        
        const update = await prisma.aluno.update(updateAlunoData)

        res.redirect('/')
    } catch (error) {
        handleErr(error, res, 'Erro ao conctar aluno ao professor')
    }
    
})

router.get('/all', async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany()
        
        res.send(alunos)
    } catch (error) {
        handleErr( error, res, 'Erro ao listar alunos' )
    }
})

router.post('/', async (req, res) => {

    const { nome, email, dataNascimento, cpf, senha, telefone, professorId } = filterNullValues(req.body)

    const data = { 
        nome, 
        email : email.toLowerCase(), 
        dataNascimento: new Date(dataNascimento) || null, 
        cpf: cpf || null, 
        senha : makeHash(senha), 
        telefone: telefone || null,
        Professores : {
            create : [
                {
                    professor : {
                        connect : {
                            id: parseInt(professorId)
                        }
                    }
                }
            ]
        }
    }        

    try {
        const aluno = await cadastrarAluno(data)
        res.send(aluno)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router