const prisma = require('../database/prisma/client')

/**
 * 
 * @param {*} professorId 
 * @returns retorna query com alunos e profile de alunos
 */
const Professor = async (professorId) => {
    return await prisma.professor.findFirst({
        where : {id : professorId},
        include : {
            profile : true,
            exercicios: true,
            alunos : {
                include : {
                    profile : true 
                }
            },
        }
    })
}

module.exports =  Professor 