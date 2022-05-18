const handleRegisterProfile = (evt) => {
    evt.preventDefault()
    ValorStringVaziaParaNull(inputsForm(this.form))
    this.form.submit()
}

/**
 * 
 * @param {*} form 
 * @returns array com inputs do formulario
 */
const inputsForm = (form) => {
    let filhos = [... form.children]
    return filhos.filter( filho => {
        if( filho.tagName == 'INPUT' ) return filho 
    })
}

/**
 * 
 * @param {*} inputs array de inputs
 * transforma valor de inputs vazios em null
 */
const ValorStringVaziaParaNull = (inputs) => {
   inputs.forEach( input => {
        if(input.value.lenght < 1) input.value = null
   });
}