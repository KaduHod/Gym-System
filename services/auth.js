const { prisma } = require('@prisma/client')
const { compareHash, makeHash } = require('./crypt')
const LocalStrategy = require('passport-local').Strategy

const findUserByEmail = async(email) => {
    return await prisma.profile.findUnique({
        where: {email:email}
    })
}

module.exports = async (passport) => {
    passport.serializeUser( (user, done) => {
        done(null, user.email)
    })

    passport.deserializeUser( async(email, done) =>{
        try {
            const user = await findUserByEmail(email)
            done(null, user)
        } catch (err) {
            console.log(err)
            return done(err, null)
        }
    })

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, async(username, password, done)=>{
        try {
            const user = await findUserByEmail(username)
            if(!user) done(null, false)

            const isValid = compareHash(password ,user.senha)

            if(!isValid) return done(null, false)
            return done(null, user)

        } catch (err) {
            console.log(err)
            return done(err, false)
        }
    }))
}