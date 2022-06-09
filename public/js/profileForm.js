const formProfile = [... document.forms][0]
const inputs = formProfile.getElementsByTagName('input')
var { confSenha, novaSenha, oldPass, cpf } = inputs
const button = formProfile.getElementsByTagName('button')[0]



/**
 * Bota mascara de cpf
 */
const putMaskCpf = () => {
    cpf.value = maskCpf(cpf.value)
}


/**
 * 
 * tira confirmação de senha como required ou bota
 */
 const handleRequire = () => {novaSenha.value.length > 0 ? setRequire(confSenha) : unSetRequire(confSenha)}

/**
 * 
 * @param {*} valor valor a ser verificado
 * @param {*} minLen comprimento minimo
 * @returns 
 */
const checkMinLength = (valor, minLen) => {return valor.length >= (minLen - 1)}

/**
 * 
 * @param {*} val1 
 * @param {*} val2 
 * @returns retorna se valores sao iguais
 */
const isEqual = (val1, val2) => {return val1 === val2}


/**
 * 
 * @returns verifica se nova senha foi confirmada no campo de confirmação
 */
 var isNewPassConfirm = novaSenha.value == confSenha.value

/**
 * Nova senha evento
 */
 const handleRequireConfSenha = () => {
    if(novaSenha.value.length > -1){
        setRequire(confSenha)
    }
}


/**
 * 
 * @param {*} el elemento html
 * seta elemento para required
 */
const setRequire   = el => { el.setAttribute('required', '') }

const unSetRequire = el => { el.removeAttribute('required')}

/**
 * 
 * @returns Verifica se tem nova senha
 * se sim retorna true e torna campo de confirmação de senha required
 */
const notNullOrEmpty = (valor) => { return (valor && valor.length > 0 && valor !== '') ? true : false }

/**
 * Controla submit
 */
const handleSubmit = evt => {    
    evt.preventDefault()

    /** se usuario digitar nova senha **/
    if (notNullOrEmpty(novaSenha.value)) {

        if(checkMinLength(novaSenha.value, 8) && isEqual(novaSenha.value, confSenha.value)) return formProfile.submit() 
        else{
            console.log('Avisar user sobre Erro de senha')
            return
        }
    } 

    return formProfile.submit()
}

cpf.addEventListener('change', putMaskCpf)
novaSenha.addEventListener('keydown', handleRequireConfSenha)
button.addEventListener('click', handleRequire)
formProfile.addEventListener('submit', handleSubmit)