 module.exports.getMessage = function(message){
     let msg = ''
     console.log(`a mensagem é ${message}`)
    if(message == 'conhece o jonas'){
        console.log('   EAI MEU CHAAPA')
        msg = 'aquele viadinho'
    }else if(message == 'conhece o lucas'){
        msg = 'aquele otario'
    }else{
        msg = message
    }
    return msg
}

