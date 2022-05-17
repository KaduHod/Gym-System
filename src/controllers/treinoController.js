const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Treino')
})

router.post('/', (req, res) => {
    res.json({'message': 'Vamos criar um treino'})
})

module.exports = router