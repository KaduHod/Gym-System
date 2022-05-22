const prisma = require('../database/prisma/client')

/**
 * 
 * @param {*} profileId id do profile do user
 * @returns instancia de profile
 */
const Profile = async (profileId) => {
    return await prisma.profile.findUnique({
        where : {id : profileId},
        include : {
            aluno : true,
            professor : true
        }
    }) 
}

module.exports = { Profile }