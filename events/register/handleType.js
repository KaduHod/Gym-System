const prisma = require('../../src/database/prisma/client')


/**
 * 
 * @param {*} options 
 * registro de aluno
 */
const registerAluno = async (id) => {
   
    try {
        const newAluno = await prisma.profile.update({
            where : { id: parseInt(id) },
            data: {
                aluno : {}
            }
        })

        console.log(newAluno)
        return newAluno
    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param {*} options 
 * registro de professor
 */
const registerProfessor = async (id) => {
    try {
        const newProfessor = await prisma.profile.update({
            where : { id: parseInt(id) },
            data: {
                professor : {}
            }
        })
    
        console.log(newProfessor)

        return newProfessor
    } catch (error) {
        console.log(error)
    }
    
}

/**
 * 
 * @param {*} options 
 * registro de admin
 */
const registerAdmin = async (id) => {
    
}

/**
 * 
 * @param {*} id 
 * @returns retorna model de profile escolhido
 */
const getProfile = async(id) => {
    return await prisma.profile.findUnique({where: {id:parseInt(id)}})
}

/**
 * 
 * @param {*} options objeto contendo id do profile e tipo de cadastro
 */
const handleType = async(options) =>{
    try {
        
        if(options.type == 'Aluno'){
            const newAluno = await prisma.profile.update({
                where : { id: parseInt(options.id) },
                data: {
                    aluno : {}
                }
            })

            return newAluno
        }

        if(options.type == 'Professor'){
            const newProfessor = await prisma.profile.update({
                where : { id: parseInt(options.id) },
                data: {
                    professor : {}
                }
            })
    
            return newProfessor
        } 
        if(options.type == 'Admin'){
    
        }
    } catch (error) {
        console.log(error)   
    } 
}

module.exports = handleType