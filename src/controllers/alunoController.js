const router = require('express').Router()


router.get('/', (req, res)=>{
    res.send('App de sistema de academia Com prisma express e nodejs')
})


module.exports = router