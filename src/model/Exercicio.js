const prisma = require('../database/prisma/client')


/**
 * 
 * @returns retorna todos os exercicios
 */
const Exercicios = async () => {
    return await prisma.exercicio.findMany({
        include : {
            criador : {
                include : {
                    profile : true
                }
            }
        }
    })
}

/**
 * 
 * @returns retorna exercicio
 */
const Exercicio = async (id) => {
    return await prisma.exercicio.findUnique({
        where : {id : id},
        include : {
            criador : {
                include : {
                    profile : true
                }
            }
        }
    })
}


module.exports = { Exercicios, Exercicio }