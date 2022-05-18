const handleErr = (err, res, msg) => {
    res.json({'message': `${msg}`})
    console.log(err)
}

const handleNullValue = (valor) => {
    
    if(valor.lenght < 0) return null

    return valor ? valor : null

}

/**
 * 
 * @param {*} values objeto com valores de inputs
 * @returns objeto adicionando null em inputs sem valor
 */
const filterNullValues = (values) => {
    let objRetorno = {}

   Object.keys(values).forEach( key => {
       console.log('aqui',values[key])
        if(values[key] !== '' || !values[key]) objRetorno[key] = values[key]
        else objRetorno[key] = null
   })

   return objRetorno
}

module.exports = {handleErr, handleNullValue, filterNullValues}