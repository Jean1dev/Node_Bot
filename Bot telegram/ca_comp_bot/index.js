const API_KEY = '1748580514:AAEc_zpRevFQvhhZWCY79Vpbz26BSCzXp4c'
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Markup = require('telegraf/markup')
const bot = new Telegraf(API_KEY)

const _inscricao = require('./controllers/inscricaoController')
const db = require('./config/config')

db()
bot.use(session())
const tecladoOpcoes = Markup.keyboard([
    ['Informacoes sobre o Centro academico'],
    ['Inscricao para os minicursos'],
    ['Prestacao de contas']
]).resize().extra()


bot.start(async ctx => {
    let nome = ctx.update.message.from.first_name
    await ctx.replyWithMarkdown(`*Olá, ${nome}!*\nEu sou o ChatBot do Centro Academico da computacao`)
    await ctx.replyWithMarkdown(`Use os botoes a baixo para uma melhor interacao`, tecladoOpcoes)
    ctx.session.state = {
        inscricao: false,
        codigo_aluno: 0,
        nome_aluno: '',
        numero_contato: '',
        id_telegram: ''
    }
})

bot.hears('Prestacao de contas', ctx => {
    ctx.replyWithMarkdown('Os gastos do Centro academicos, sao de acesso publico e estao em nosso gitHub [GIT](https://github.com/centro-academico-charles-babbage)')
})

bot.hears('Informacoes sobre o Centro academico', ctx => {
    ctx.replyWithMarkdown("Esta rolando um sorteio de 4 ingressos para os minicursos, corre la pra fazer sua inscricao", tecladoOpcoes)
})

bot.hears('Inscricao para os minicursos', async ctx => {
    let obj = await getByIdTelegram(ctx.update.message.from.id)
    if (obj.length == 0 || obj == null) {
        ctx.session.state.inscricao = true
        ctx.session.state.id_telegram = ctx.update.message.from.id
        ctx.reply('OK, me fala qual é o seu codigo de aluno (aquele q vc usa pra acessar o ava)')
        return
    }
    ctx.reply(`Voce ja fez sua inscricao ${ctx.update.message.from.first_name}`)
})

bot.on('text', async ctx => {

    if (ctx.session.state == undefined) {
        ctx.reply(`Ocorreu um problema digite /start para recomecar`)
        return
    }
    if (!ctx.session.state.inscricao) {
        let obj = await getByIdTelegram(ctx.update.message.from.id)
        if (obj.length == 0 || obj == null) {
            ctx.reply('Ainda estou em fase de aprendizado, Nao sei o que dizer')
            return
        }
        ctx.reply(`Voce ja fez sua inscricao ${ctx.update.message.from.first_name}`)
    } else if (ctx.session.state.codigo_aluno == 0) {
        ctx.session.state.codigo_aluno = ctx.message.text
        ctx.reply('OK, agora me fala qual é o seu nome')
    } else if (ctx.session.state.nome_aluno == '') {
        ctx.session.state.nome_aluno = ctx.message.text
        ctx.reply('Blz, passa o numero para entrarmos em contato')
    } else {
        ctx.session.state.numero_contato = ctx.message.text
        await ctx.reply('So um momento')
        if (cadastrar(ctx)) {
            ctx.reply(`Blz ${ctx.update.message.from.first_name} cadastro feito, Boa sorte`)
        } else {
            ctx.reply(`Ocorreu um problema`)
        }
        ctx.session.state.inscricao = false
    }
})

bot.on('sticker', ctx => {
    let sticker = ctx.update.message.sticker
    ctx.reply(`Ta mandando sticke ne safado ${sticker.emoji}`)
})

const cadastrar = async ctx => {
    return await _inscricao.store({
        codigo_aluno: ctx.session.state.codigo_aluno,
        nome_aluno: ctx.session.state.nome_aluno,
        numero_contato: ctx.session.state.numero_contato,
        id_telegram: ctx.session.state.id_telegram
    })
}

const getByIdTelegram = async id => {
    return await _inscricao.getByIdTelegram(id)
}

bot.startPolling()