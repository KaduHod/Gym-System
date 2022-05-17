const handleErr = (err, res, msg) => {
    res.json({'message': `${msg}`})
    console.log(err)
}

module.exports = handleErr