const prisma = require('../database/prisma/client')


/**
 * 
 * @param {*} alunoId 
 * @returns retorna query com professores e profile de professores
 */
const Aluno = async(alunoId) => {
    let aluno = await prisma.aluno.findFirst({
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

    return aluno
}

module.exports = Aluno