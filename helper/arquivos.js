const fs = require('fs')
require('dotenv/config') 

const getExtension = (nomeDoArquivo) => {
    return nomeDoArquivo.split('.').pop()
}

const deletarArquivo = (folder ,filename) => {
    try {
        fs.unlinkSync(process.env.STORAGE_PATH + `/${folder}/${filename}`)
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getExtension , deletarArquivo}