const mongoose = require("mongoose")

const Multa = mongoose.model('Multa')

module.exports = {
    async index(req,res){
        const multas = await Multa.find();

        return res.json(multas)

    },

    async store(req,res){
        const multa = await Multa.create(req.body)
        return res.json(multa)
    },

    async show(req,res){
        const multa = await Multa.findById(req.params.id)
        return res.json(multa)
    },

    async update(req, res){
        const multa = await Multa.findByIdAndUpdate(req.params.id, req.body, {
            new: true  
        })

        return res.json(multa)
    },

    async destroy(req, res){
        await Multa.findByIdAndRemove(req.params.id)
        
        return res.send()
    }


}