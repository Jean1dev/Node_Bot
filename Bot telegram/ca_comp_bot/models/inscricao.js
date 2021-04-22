const mongoose = require("mongoose")

const Inscricao = new mongoose.Schema({
    codigo_aluno: {
        type: String,
        required: true
    },
    nome_aluno: {
        type: String,
        required: true
    },
    numero_contato: {
        type: String,
        required: true
    },
    id_telegram: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Inscricao', Inscricao)