const isEqual = (val1, val2) => {return val1 === val2}

const checkMinLength = (valor, minLen) => {return valor.length >= (minLen - 1)}

module.exports = { isEqual, checkMinLength }