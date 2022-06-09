const regexMatch = (regex, str) => {
    return regex.test(str)
}

const onlyNumberRegex = /^[0-9]*$/

const maskCpf = (valor) => {
    let regex = /^(\d{3})(\d{3})(\d{3})(\d{2})/
    let onlyNumber = regexMatch(onlyNumberRegex, valor) 
    
    if(!onlyNumber) return 

    return  valor.replace(regex, '$1.$2.$3-$4')
}

const maskTelefone = (valor) => {
    let onlyNumber = regexMatch(onlyNumberRegex, valor)

    if(!onlyNumber) return false

    let regex = /(\d{2})(\d{5})(\d{4})/
    return valor.replace(regex, '(0$1) $2-$3')
}