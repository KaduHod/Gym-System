const prisma = require('../database/prisma/client')


/**
 * 
 * @param {*} alunoId 
 * @returns retorna query com professores e profile de professores
 */
const Aluno = async(alunoId) => {
    return await prisma.aluno.findFirst({
        where : {id : alunoId},
        include : {
            professores : {
                include : {
                    profile : true
                }
            },
            profile : true
        }
    })
}

module.exports = Aluno