const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.key)

bot.start(ctx => {
    const from = ctx.update.message.from 
    console.log(from)
    ctx.reply(`eai mein ${from.first_name}`)
})

bot.startPolling()