const isEqual = (val1, val2) => val1 === val2

const checkMinLength = (valor, minLen) => valor.length >= (minLen - 1)

module.exports = { isEqual, checkMinLength }