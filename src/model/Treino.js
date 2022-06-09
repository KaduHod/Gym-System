const prisma = require('../database/prisma/client')

const Treino = async id => {
    return await prisma.treino.findUnique({
        where : {id : id},
        include: {
            exercicios : {
                include : {
                    exercicio : true
                }
            },
            aluno : {
                include : {
                    profile : true
                }
            },
            professor : {
                include : {
                    profile : true
                }
            }
        }
    })
} 

const Treinos = async() => {
    return await prisma.treino.findMany({
        
        include: {
            exercicios : {
                include : {
                    exercicio : true
                }
            },
            aluno : {
                include : {
                    profile : true
                }
            },
            professor : {
                include : {
                    profile : true
                }
            }
        }
    })
}

module.exports = { Treinos, Treino }