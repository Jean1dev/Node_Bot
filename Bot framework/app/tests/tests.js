// load env variables from the .env file
//require('dotenv-extended').load()

const builder = require('botbuilder')
const restify = require('restify')
const cognitiveServices = require('botbuilder-cognitiveservices')


//=========================================================
// Bot Setup
//=========================================================

const port = process.env.port || process.env.PORT || 8080
const server = restify.createServer()
server.listen(port, () => {
    console.log(`${server.name} listening to ${server.url}`)
})

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORd
})

const bot = new builder.UniversalBot(connector)
bot.set('storage', new builder.MemoryBotStorage())
server.post('/api/messages', connector.listen())

//=========================================================
// Bots Dialogs
//=========================================================

const recognizer = new cognitiveServices.QnAMakerRecognizer({
  knowledgeBaseId: '5df3568b-9957-40be-b840-ed35ed9679a8',
  subscriptionKey: '7adfd79b8dc24e9fbae7db5a42e93575',
  top: 3
})

const qnaMakerTools = new cognitiveServices.QnAMakerTools()
bot.library(qnaMakerTools.createLibrary())

const basicQnaMakerDialog = new cognitiveServices.QnAMakerDialog({
  recognizers: [recognizer],
  defaultMessage: 'Não encontrado! Tente alterar os termos da pergunta!',
  qnaThreshold: 0.5,
  feedbackLib: qnaMakerTools
})

basicQnaMakerDialog.respondFromQnAMakerResult = (session, qnaMakerResult) => {
    const firstAnswer = qnaMakerResult.answers[0].answer
    const composedAnswer = firstAnswer.split(';')
    if (composedAnswer.length === 1) {
    return session.send(firstAnswer)
    }
    const [title, description, url, image] = composedAnswer
    const card = new builder.HeroCard(session)
        .title(title)
        //.text(description)
        .images([builder.CardImage.create(session, image.trim())])
        .buttons([builder.CardAction.openUrl(session, url.trim(), 'Veja mais')])
    const reply = new builder.Message(session).addAttachment(card)
    session.send(reply)
}

bot.dialog('/', basicQnaMakerDialog)