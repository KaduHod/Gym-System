const router = require('express').Router()
const prisma = require('../database/prisma/client')
const {handleErr, filterNullValues} = require('../../helper/handles')
const Professor = require('../model/Professor')



router.get('/', async(req, res)=>{
    let user = await Professor(req.user.professorId)
    

    res.render('dashboard', {user: user})
    
})


router.get('/all', async (req, res) => {
    try {
        const professores = await prisma.professor.findMany({
            include: {
                profile : true
            }
        })

        res.send(professores)
    } catch (error) {
        handleErr( error, res, 'Erro ao listar professores' )
    }
})





module.exports = router