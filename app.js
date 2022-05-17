const express = require('express')
const app = express()
const path = require('path');
const { engine } = require('express-handlebars')
require('dotenv/config') 

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

    app.use(express.static(__dirname + './public'))

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

    /**
     * Rotas bases
     */
    app.use('/login',     loginController)
    app.use('/register',  registerController)
    app.use('/',          indexController)
    app.use('/treino',    treinoController)
    app.use('/aluno',     alunoController)
    app.use('/professor', professorController)
    




try {
    const port = process.env.PORT || 9000
    app.listen(port)

    console.log( 'Servidor rodando em http://localhost:' + port )
} catch ( error ) {
    console.log( error )
}

