const router = require('express').Router()
const prisma = require('../database/prisma/client')


router.get('/', (req, res)=>{
    res.send('App de sistema de academia Com prisma express e nodejs')
})



module.exports = router