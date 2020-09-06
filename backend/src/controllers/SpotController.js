const User = require('../models/User')
const Spot = require('../models/Spot')
// index, show, store, update, destroy

module.exports = {
    async index(req, res){
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res){
        const { filename } = req.file; // é o nome que foi salvo no sistema (com os tratamentos para "unificar" )
        const { company, techs, price } = req.body;
        const { user_id } = req.headers; // esse par., foi passado pelo header, pois é um par. que se passa em todas req. assim como{ idioma etc. }

        const user = await User.findById(user_id);

        if (!user) {
            return req.status(400).json({ error: 'User does not exits!'});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map( tech=> tech.trim()), //split = string em array | trim = tira os espaço
            price
        });

        return res.json(spot);
    }

};