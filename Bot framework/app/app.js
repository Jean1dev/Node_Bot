var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
console.log('digita ai parça')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Você disse: %s", session.message.text);
});