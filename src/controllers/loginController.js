const router = require('express').Router()
const prisma = require('../database/prisma/client')
const { compareHash, makeHash } = require('../../services/crypt')
const passport = require('passport')


router.get('/', async(req, res)=>{
    res.render('login/login')
})

/**
 * Rota managed by passport
 */
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))



module.exports = router