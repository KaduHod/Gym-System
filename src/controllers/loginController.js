const router = require('express').Router()
const prisma = require('../database/prisma/client')


router.get('/', async(req, res)=>{

    // const profile = {
    //     email: 'carlosjr.ribas@gmail.com',
    //     senha: 12345678,
    //     online: false,
    //     type: 'professor',
    //     userId: null,
    // }

    // const prismaProfile = await prisma.profile.create( {data : profile} )

    // return res.send(prismaProfile)
    res.render('login/login')
})

router.post('/')



module.exports = router