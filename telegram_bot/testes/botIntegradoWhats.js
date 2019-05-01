const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.key)
const request = require('request')

bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)
    ctx.reply(`eai mein ${from.first_name}`)
})

bot.on('text', ctx => {
    ctx.reply(`Texto ${ctx.update.message.text} recebido`)
    request.post('http://localhost:8080/', {
        json: {
            contato: ctx.update.message.text
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
    })
})

bot.startPolling()