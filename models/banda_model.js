const mongoose = require('mongoose');

const musicaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    nome: String,
    imagem: String,
    url: String
});

const bandaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    nome: String,
    imagem: String,
    categoria: String,
    musicas: [musicaSchema]
});

module.exports = mongoose.model('Banda', bandaSchema);