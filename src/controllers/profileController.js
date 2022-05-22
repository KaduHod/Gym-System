const router = require('express').Router()
const { Profile } = require('../model/Profile')


/* router.get('/', async(req, res) => {
    let profile = await Profile(req.user.id)
    res.send(profile)
}) */

module.exports = router