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
    musicas: [musicaSchema]
});

module.exports = mongoose.model('Banda', bandaSchema);