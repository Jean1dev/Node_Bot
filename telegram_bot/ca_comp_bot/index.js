const env = require('../.env')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.key_comp)
const _inscricao = require('./controllers/inscricaoController')
const db = require('./config/config')
const state = {
    inscricao: false,
    codigo_aluno: 0,
    nome_aluno: '',
    numero_contato: '',
    id_telegram: ''
}

db()
const tecladoOpcoes = Markup.keyboard([
    ['Informacoes sobre o Centro academico'],
    ['Inscricao para os minicursos'],
    ['Prestacao de contas']
]).resize().extra()


bot.start(async ctx => {
    let nome = ctx.update.message.from.first_name
    await ctx.replyWithMarkdown(`*Olá, ${nome}!*\nEu sou o ChatBot do Centro Academico da computacao`)
    await ctx.replyWithMarkdown(`_Posso te ajudar em algo?_`, tecladoOpcoes)
})

bot.hears('Prestacao de contas', ctx => {
    ctx.replyWithMarkdown('Os gastos do Centro academicos, sao de acesso publico e estao em nosso gitHub [GIT](https://github.com/centro-academico-charles-babbage)')
})

bot.hears('Informacoes sobre o Centro academico', ctx => {
    ctx.replyWithMarkdown("Esta rolando um sorteio de 4 ingressos para os minicursos, corre la pra fazer sua inscricao", tecladoOpcoes)
})

bot.hears('Inscricao para os minicursos', ctx => {
    state.inscricao = true
    state.id_telegram = ctx.update.message.from.id
    ctx.reply('OK, me fala qual é o seu codigo de aluno (aquele q vc usa pra acessar o ava)')
})

bot.on('text', async ctx => {
    if(!state.inscricao){
        let obj = await getByIdTelegram(ctx.update.message.from.id)
        if(obj.length == 0 || obj == null){
            ctx.reply('Ainda estou em fase de aprendizado, Nao sei o que dizer')
            return
        }
        ctx.reply(`Voce ja fez suas inscricao ${ctx.update.message.from.first_name}`)

    }else if(state.codigo_aluno == 0){
        state.codigo_aluno = ctx.message.text
        ctx.reply('OK, agora me fala qual é o seu nome')
    }else if(state.nome_aluno == ''){
        state.nome_aluno = ctx.message.text
        ctx.reply('Blz, passa o numero para entrarmos em contato')
    }else{
        state.numero_contato = ctx.message.text
        ctx.reply('So um momento')
        if(cadastrar()){
            ctx.reply(`Blz ${ctx.update.message.from.first_name} cadastro feito, Boa sorte`)
        }else{
            ctx.reply(`Ocorreu um problema`)
        }
        state.inscricao = false
    }
})

bot.on('sticker', ctx => {
    let sticker = ctx.update.message.sticker
    ctx.reply(`Ta mandando sticke ne safado ${sticker.emoji}`)
})

const cadastrar = async () => {
    return await _inscricao.store({
        codigo_aluno: state.codigo_aluno,
        nome_aluno: state.nome_aluno,
        numero_contato: state.numero_contato,
        id_telegram: state.id_telegram
    })
}

const getByIdTelegram = async (id) => {
    return await _inscricao.getByIdTelegram(id)
}

bot.use(session())
bot.startPolling()