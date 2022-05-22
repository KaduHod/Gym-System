const router = require('express').Router()
const prisma = require('../database/prisma/client')

router.get('/home', (req, res)=>{
    let user = req.user
    req.flash('success',`Bem vindo novamente, ${req.user.nome}`)
    if(user.type == 'professor' || user.type == 'Professor'){
        
        res.redirect('/professor')
    }
    if(user.type == 'aluno' || user.type == 'Aluno'){
        res.redirect('/aluno')
    }
})
module.exports = router
