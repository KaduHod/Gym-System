const express = require('express')
const app = express()
const path = require('path');
const {engine} = require('express-handlebars')
const hb = require('handlebars')
const passport = require('passport')
const session = require('express-session');
const req = require('express/lib/request');
const res = require('express/lib/response');
const moment = require("moment");
const flash = require('connect-flash');

require('dotenv/config') 
require('./services/authentication/auth')(passport)


    /**
     * 
     * Middlewares
     */
    const authMiddleware = (req, res, next) => {
        if(req.isAuthenticated()) return next()
        res.redirect('/login')
        return next()
    }

    const professorMiddleware = (req, res, next) => {
        const backURL = req.header('Referer') || '/'

        if(req.user.type == 'professor' || req.user.type == 'Professor' ) return next()

        res.redirect(backURL)
    }
    const adminMiddleware = (req, res, next) => {
        const backURL = req.header('Referer') || '/'

        if(req.user.type == 'admin' || req.user.type == 'Admin' ) return next()
        
        res.redirect(backURL)
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
    app.use(flash())

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

    hb.registerHelper('dateFormat', function (date, options) {
        const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "DD/MM/YYYY"
        return moment(date).format(formatToUse);
    });

    hb.registerHelper('dateNow', () => {
        return new Date();
    });

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
    app.use('/logout',    authMiddleware, (req, res)=>{
        req.logout()
        res.redirect('/login')
    })



try {
    const port = process.env.PORT || 9000
    app.listen(port)

    console.log( 'Servidor rodando em http://localhost:' + port )
} catch ( error ) {
    console.log( error )
}

