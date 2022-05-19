const router = require('express').Router()
const prisma = require('../database/prisma/client')
const { compareHash, makeHash } = require('../../services/crypt')
const passport = require('passport')


router.get('/', async(req, res)=>{
    if(req.query.fail){
        return res.render('login/login', {message : 'Usuario ou senha invalido'})
    }
    return res.render('login/login', {message: null})
})

/**
 * Rota managed by passport
 */
router.post('/', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}))



module.exports = router