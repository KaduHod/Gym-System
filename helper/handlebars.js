const moment = require("moment");
require('dotenv/config') 

const dateNow  = new Date();

function isProfessor (type) { 
    return type === 'professor' ? true : false
}

function dateInputValue (date) {
    return new Date(date).toISOString().split('T')[0]
}

function dateFormat (date) {
    if(date == null) return ''
    const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "DD/MM/YYYY"
    return moment(date).format(formatToUse);
}

module.exports = { dateFormat, dateInputValue, isProfessor, dateNow }