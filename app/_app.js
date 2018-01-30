const restify = require('restify');
const builder = require('botbuilder');
const html = require('./htmlRequest')
const cognitiveServices = require('botbuilder-cognitiveservices')
//var _port_ = 3978
var _port = 8080

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || _port, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Crie um chat conector para se comunicar com o Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Endpoint que irá monitorar as mensagens do usuário
server.post('/api/messages', connector.listen());

// Recebe as mensagens do e responde repetindo cada mensagem (prefixado com 'Você disse:')
var bot = new builder.UniversalBot(connector, function (session) {
    var message = html.httpRequest(session.message.text, session)
    console.log('finalizou')
    //bot.dialog('/api/messages', basicQnaMakerDialog)
});

const qnaMakerTools = new cognitiveServices.QnAMakerTools()
bot.library(qnaMakerTools.createLibrary())

const basicQnaMakerDialog = new cognitiveServices.QnAMakerDialog({
    recognizers: '[recognizer]',
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
        .text(description)
        .images([builder.CardImage.create(session, image.trim())])
        .buttons([builder.CardAction.openUrl(session, url.trim(), 'Comprar agora')])
    const reply = new builder.Message(session).addAttachment(card)
    session.send(reply)
}