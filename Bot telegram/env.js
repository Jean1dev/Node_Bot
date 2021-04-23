// renomear esse arquivo para .env
// module.exports.token = `1748580514:AAEc_zpRevFQvhhZWCY79Vpbz26BSCzXp4c`
// module.exports.token_comp = ``
const token = `1748580514:AAEc_zpRevFQvhhZWCY79Vpbz26BSCzXp4c`

module.exports = {
    key: token,
    userId: 123,
    apiUrl: `https://api.telegram.org/bot${token}`,
    apiFileUrl: `https://api.telegram.org/file/bot${token}`,
    url_mongo: 'mongodb://127.0.0.1:27017/cacomp'
}