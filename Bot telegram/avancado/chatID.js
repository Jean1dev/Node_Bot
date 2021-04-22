const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.key)

bot.start(ctx => {
    console.log(ctx.chat.id === ctx.update.message.from.id)
    console.log(ctx.chat.id)
})

bot.startPolling()