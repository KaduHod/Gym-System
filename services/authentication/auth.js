const prisma = require('../../src/database/prisma/client')
const { compareHash, makeHash } = require('../crypt')
const LocalStrategy = require('passport-local').Strategy

const findProfileByEmail = async(email) => {
    return await prisma.profile.findUnique({
        where: {email:email}
    })
}

const findProfileById = async(id) => {
    return prisma.profile.findUnique({
        where : {id: parseInt(id)}
    })
}

module.exports = async (passport) => {

    passport.serializeUser( (user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser( async(id, done) =>{
        try {
            const user = await findProfileById(id)
            done(null, user)
        } catch (err) {
            console.log(err)
            return done(err, null)
        }
    })


    /**
     * Estratégia
     */
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, async(username, password, done)=>{
        try {
            const user = await findProfileByEmail(username)
            
            if(!user) return done(null, false)

            const isValid = compareHash(password ,user.senha)
            
            if(!isValid) return done(null, false)
            return done(null, user)

        } catch (err) {
            console.log(err)
            return done(err, false)
        }
    }))
}