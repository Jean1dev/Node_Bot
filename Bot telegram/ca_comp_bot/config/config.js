const env = require('../../env')
const url = env.url_mongo
const init = () => {
    const mongo = require('mongoose')

    mongo.connect(url, {
        useNewUrlParser: true
    })
}

module.exports = init