// renomear esse arquivo para .env
const token = `KEY DA API DO TELEGRAMA AQUI`

module.exports = {
    key: token,
    apiUrl: `https://api.telegram.org/bot${token}`,
    apiFileUrl: `https://api.telegram.org/file/bot${token}`
}