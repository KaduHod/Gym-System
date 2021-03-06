const router = require('express').Router()
const prisma = require('../database/prisma/client')
const {handleErr, handleNullValue, filterNullValues} = require('../../helper/handles')
const handleType = require('../../events/register/handleType')


router.get('/', (req, res) => {
    res.render('register/register')
})

router.post('/', async(req , res) => {
    
    const {nome, telefone, dataNascimento, cpf, email, senha} = filterNullValues(req.body)

    try {
        const profile = {
            email: email,
            senha: senha,
            nome:                       nome || null,
            telefone:               telefone || null,
            dataNascimento:   new Date(dataNascimento) || null,
            cpf:                         cpf || null
        }   

        
        const newProfile = await prisma.profile.create({ data : profile })
        
        res.redirect('/register/type/' + newProfile.id)
    } catch (error) {
        handleErr(error, res, 'Erro em cadastrar profile')
    }
})

router.get('/type/:id', async(req, res) => {
    try {
        const {id} = req.params

        const profile = await prisma.profile.findUnique({
            where: { 
                id : parseInt(id) 
            } 
        })

        res.render('register/type', {profile: profile})

    } catch (error) {
        handleErr(error, res, 'Erro ao renderizar pagina de registro do tipo de aluno')
    }
})

router.get('/type/:id/:type/', async(req, res)=>{
    const {id, type} = req.params
    
    try {
        const newUser = await handleType({id, type})

        console.log('Aqui',newUser)
    } catch (error) {
        handleErr(error, res, `Erro cadastrar ${type}`)
    }
})



module.exports = router