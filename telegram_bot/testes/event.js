const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.key)

bot.start(ctx => {
    const from = ctx.update.message.from 
    console.log(from)
    ctx.reply(`eai mein ${from.first_name}`)
})

bot.on('text', ctx => {
    ctx.reply(`Texto ${ctx.update.message.text} recebido`)
})

bot.on('location', ctx => {
    const location = ctx.update.message.location
    console.log(location)
    ctx.reply(`Tendeu bro, vc esta em 
        Lat:${location.latitude}, Long:${location.longitude}`)
})

bot.on('contact', ctx => {
    const contact = ctx.update.message.contact
    console.log(contact)
    ctx.reply(`Vou lembrar de voce
        ${contact.first_name} ${contact.phone_number}`)
})

bot.on('voice', ctx => {
    const voice = ctx.update.message.voice
    console.log(voice)
    ctx.reply(`Audio recebido, ele possui ${voice.duration} segundos`)
})

bot.on('photo', ctx => {
    const photo = ctx.update.message.photo
    console.log(photo)
    photo.forEach((ph, i) => {
        ctx.reply(`Photo ${i} tem resolucao de ${ph.width}x${ph.height}`)
    })
})

bot.on('sticker', ctx => {
    const sticker = ctx.update.message.sticker
    console.log(sticker)
    ctx.reply(`Ta mandando sticke ne safado ${sticker.emoji}`)
})

bot.startPolling()