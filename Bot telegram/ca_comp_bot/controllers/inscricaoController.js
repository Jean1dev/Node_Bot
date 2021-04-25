const model = require('../models/inscricao')

class InscricaoController {
    
    async store(content) {
        try {
            const ret = await model.create(content)
            return true
        } catch (error) {
            // tratar erros aqui
            return false
        }
    }

    async getById(codigo_aluno) {
        try {
            const ret = await model.find({ codigo_aluno: codigo_aluno})
            return ret
        } catch (error) {
            // tratar erros
            return null
        }
    }
    
    async getByIdTelegram(id) {
        try {
            return await model.find({ id_telegram: id })
        } catch (error) {
            return null
        }
    }
}

module.exports = new InscricaoController()
