const { handleErr, handleNullValue, filterNullValues } = require('../../helper/handles')
const { compareHash, makeHash } = require('../../services/crypt')
const { handleType } = require('../../events/register/handleType')
const prisma = require('../database/prisma/client')
const router = require('express').Router()




router.get('/allProfiles', async (req, res) => {
    const profiles = await prisma.profile.findMany()
    res.send(profiles);
})
router.get('/', (req, res) => {
    res.render('register/register')
})

router.post('/', async(req , res) => {
    
    const {nome, telefone, dataNascimento, cpf, email, senha} = filterNullValues(req.body)
    const hashPwd = makeHash(senha)
    try {
        const profile = {
            email: email,
            senha: hashPwd,
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