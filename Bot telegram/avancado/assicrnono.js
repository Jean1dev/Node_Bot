const env = require('../.env')
const Telegram = require('telegraf/telegram')
const axios = require('axios')
const Markup = require('telegraf/markup')

const enviarMensagem = msg => {
    axios.get(`${env.apiUrl}/sendMessage?chat_id=${env.userId}&text=${encodeURI(msg)}`)
        .catch(e => console.log(e))
}

enviarMensagem('Enviando a mensagem de forma assíncrona')

const teclado = Markup.keyboard([
    ['Ok', 'Cancelar']
]).resize().oneTime().extra()

const telegram = new Telegram(env.key)
telegram.sendMessage(env.userId, 'Essa é uma mensagem com teclado', teclado)
