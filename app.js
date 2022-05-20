const express = require('express')
const app = express()
const path = require('path');
const { engine } = require('express-handlebars')
const passport = require('passport')
const session = require('express-session');
const req = require('express/lib/request');
require('dotenv/config') 
require('./services/authentication/auth')(passport)

const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}

    /**
     * Forma de ler JSON
     * middlewares
     */
    app.use(
        express.urlencoded({
            extended:true,
        }),
    ) 
    app.use(express.json())

    /**
     * Session
     */
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 120 * 60 * 1000
        },
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    /**
     * Arquivos estaticos
     */
    app.use(express.static(__dirname + '/public'))

    /**
     * Tamplate Engine
     */
    const handlebarsOptions = {
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    }

    app.engine('handlebars', engine(handlebarsOptions))
    app.set('view engine', 'handlebars')
    app.set('views', path.join(__dirname + '/views'))

    /**
     * Controllers
     */
    const pathController = './src/controllers/'
    const indexController     = require(pathController + 'indexController' )
    const treinoController    = require(pathController + 'treinoController' )
    const alunoController     = require(pathController + 'alunoController' )
    const professorController = require(pathController + 'professorController' )
    const loginController     = require(pathController + 'loginController' )
    const registerController  = require(pathController + 'registerController' )
    const exercicioController = require(pathController + 'exercicioController')

    /**
     * Rotas bases
     */
    app.use('/login',loginController)
    app.use('/register', registerController)
    app.use('/',          authMiddleware, indexController)
    app.use('/treino',    authMiddleware, treinoController)
    app.use('/aluno',     authMiddleware, alunoController)
    app.use('/professor', authMiddleware, professorController)
    app.use('/exercicio', authMiddleware, exercicioController)

    
    




try {
    const port = process.env.PORT || 9000
    app.listen(port)

    console.log( 'Servidor rodando em http://localhost:' + port )
} catch ( error ) {
    console.log( error )
}

