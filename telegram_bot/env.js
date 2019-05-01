// renomear esse arquivo para .env
module.exports.token = `KEY DA API DO TELEGRAMA AQUI`

module.exports = {
    key: token,
    userId: 123,
    apiUrl: `https://api.telegram.org/bot${token}`,
    apiFileUrl: `https://api.telegram.org/file/bot${token}`
}