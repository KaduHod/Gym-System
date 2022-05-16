const express = require('express')
const app = express()
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

/**
 * Rotas e Controllers
 */
const indexController = require('./src/controllers/indexController')
const treinoController = require('./src/controllers/treinoController')
const alunoController = require('./src/controllers/alunoController')
const professorController = require('./src/controllers/professorController')

app.use('/', indexController)
app.use('/treinos', treinoController)
app.use('/aluno', alunoController)
app.use('/professor', professorController)




try {
    const port = process.env.PORT || 9000
    app.listen(port)

    console.log( 'Servidor rodando em http://localhost:' + port )
} catch ( error ) {
    console.log( error )
}

