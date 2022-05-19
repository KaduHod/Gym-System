const prisma = require('../src/database/prisma/client')

/**
 * 
 * @param {*} data professor
 */
const cadastrarProfessor = async(data) => {
    try {
        return await prisma.professor.create({data:data})
    } catch (error) {
        console.log(error)
        return error
    }
}

const cadastrarAluno = async(data) => {
    try {
        return await prisma.aluno.create({data:data})
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { cadastrarProfessor, cadastrarAluno }