const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const utilitarios = require('./eastereggs')
const restAPI = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0' 
const knowledgebaseId = '5df3568b-9957-40be-b840-ed35ed9679a8'
const qnamakerSubscriptionKey = '7adfd79b8dc24e9fbae7db5a42e93575'
var message = ''

module.exports.httpRequest = function(param, session){
    message = param
    var url = buildURL()
    var http = new XMLHttpRequest()
    var data = buildJson()

    http.open('POST', url)
    http.setRequestHeader('Content-Type', 'application/json')
    http.setRequestHeader('Ocp-Apim-Subscription-Key', qnamakerSubscriptionKey)
    http.send(JSON.stringify(data))    
    http.onload = function(){
        if(http.status === 200){
            var data = JSON.parse(http.responseText)
            message = dismiuçaJson(data)
            message = utilitarios.getMessage(message)
            
            session.send("Bot diz: %s", message);
        }else{
            console.log('DEUUUUUUUUUUUU PAUUUUU')
            session.send('Bot diz: Problemas com o servidor');
        }
    }
}

function buildURL(){
    var link = undefined
    link = `${restAPI}/knowledgebases/${knowledgebaseId}/generateAnswer`
    var obj = link.toString()
    return obj
}

function buildJson(){
    var js = `{"question":"${message}"}`
    var obj = JSON.parse(js)
    return obj
}

function dismiuçaJson(param){
    for(var i = 0; i < param.answers.length; i++){
        var msgRetorno = param.answers[i].answer
        var msgPergunta = param.answers[i].questions.toString()
    }

    if(msgPergunta == ''){
        return message
    }else{
        return msgRetorno  
    } 
}