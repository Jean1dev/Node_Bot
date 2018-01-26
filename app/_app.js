var restify = require('restify');
var builder = require('botbuilder');
var conexoes = require('./eastereggs')
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

// Recebe as mensagens do usuário e responde repetindo cada mensagem (prefixado com 'Você disse:')
var bot = new builder.UniversalBot(connector, function (session) {
    var message = conexoes(session.message.text)
    session.send("Você disse: %s", message);
});