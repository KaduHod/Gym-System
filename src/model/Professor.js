const prisma = require('../database/prisma/client')

/**
 * 
 * @param {*} professorId 
 * @returns retorna query com alunos e profile de alunos
 */
const Professor = async (professorId) => {
    let professor = await prisma.professor.findFirst({
        where : {id : professorId},
        include : {
            alunos : {
                include : {
                    profile : true
                }
            },
            profile : true
        }
    })
    return professor
}

module.exports =  Professor 