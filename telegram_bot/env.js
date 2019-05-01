// renomear esse arquivo para .env
module.exports.token = `KEY DA API DO TELEGRAMA AQUI`
module.exports.token_comp = ``

module.exports = {
    key: token,
    userId: 123,
    apiUrl: `https://api.telegram.org/bot${token}`,
    apiFileUrl: `https://api.telegram.org/file/bot${token}`,
    url_mongo: 'mongodb://127.0.0.1:27017/cacomp'
}