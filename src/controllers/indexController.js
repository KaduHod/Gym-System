const router = require('express').Router()
const prisma = require('../database/prisma/client')


router.get('/', (req, res)=>{
    res.render('home')
})



module.exports = router