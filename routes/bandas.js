const express = require('express');
const router = express.Router();
const BandaModel = require('../models/banda_model');
const mongoose = require('mongoose');


router.get('/', async function (req, res) {
    try {
        const bandas = await BandaModel
            .find({}, { _id: 1, nome: 1, imagem: 1 })
            .exec();
        res.json(bandas);
    } catch (error) {
        console.log(error);
        res.status(500).send({ 'message': 'Erro ao buscar bandas' });
    }
});

router.post('/', async function (req, res) {

    try {
        const bandaModel = new BandaModel({
            _id: mongoose.Types.ObjectId(),
            nome: req.body.nome,
            imagem: req.body.imagem,
            musicas: []
        });

        await bandaModel.save();
        res.status(200).send();

    } catch (error) {
        console.error(error);
        res.status(500).send({ 'message': 'Erro ao cadastrar banda' });
    }

});

router.put('/:id/musica', async function (req, res) {
    try {
        const bandaUpdate = BandaModel.findByIdAndUpdate(req.params['id'], {
            $push: {
                musicas: {
                    _id: mongoose.Types.ObjectId(),
                    nome: req.body.nome,
                    imagem: req.body.imagem,
                    url: req.body.url
                }
            }
        });

        await bandaUpdate.exec();
        res.send({ 'message': 'Musica adicionada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ 'message': 'Erro ao cadastrar musica' });
    }
});

router.get('/:id', function (req, res) {
    BandaModel
        .findById(req.params['id'])
        .exec()
        .then(doc => res.json(doc))
        .catch(err => {
            console.error(err);
            res.status(500).send({ 'message': 'Erro ao buscar banda' })
        });
});

router.get('/musica/:id', async function (req, res) {
    try {
        const docBanda = await BandaModel.findOne({ 'musicas._id': req.params['id'] }, { 'musicas.$': 1 });

        if (docBanda && docBanda.musicas) {
            res.json(docBanda.musicas[0]);
        } else {
            res.send({});
        }
    } catch (error) {
        console.error(error);
        res.send({});
    }

});
router.delete('/:id', async function (req, res) {
    try {
        await BandaModel.findByIdAndRemove(req.params['id']).exec();
        res.send();
    } catch (error) {
        res.status(500).send({ 'message': 'Erro ao deletar banda' });
    }
})

router.delete('/:id/musica/:musica', function (req, res) {
    BandaModel.findByIdAndUpdate(req.params['id'], {
        $pull: {
            musicas: {
                _id: req.params['musica']
            }
        }
    }).exec().then((_) => res.send())
        .catch(err => {
            console.error(err);
            res.status(500).send({ 'message': 'Erro ao excluir musica' });
        });
});

module.exports = router;