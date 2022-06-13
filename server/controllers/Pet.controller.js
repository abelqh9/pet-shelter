const Pet = require('../models/Pet.model');

module.exports.getAllPets = function (req, res) {
    Pet.find()
        .then(pets => res.status(200).json(pets))
        .catch(err => res.status(400).json(err));
}

module.exports.getOnePet = function (req, res) {
    Pet.find({_id: req.params.id})
        .then(pet => res.status(200).json(pet))
        .catch(err => res.status(400).json(err));
}

module.exports.createPet = function (req, res) {
    Pet.findOne({name: req.body.name.trim()})
        .then(pet => {
            if (!pet) {
                Pet.create({...req.body, likes: 0})
                    .then(newPet => res.status(200).json(newPet))
                    .catch(err => res.status(400).json(err));
            }else{
                res.statusMessage = 'A pet with this name already exist in our shelter';
                res.status(400).send();
            }
        })
        .catch(err => {
            res.statusMessage = 'Something went wrong, please try again';
            res.status(400).send();
        })
}

module.exports.updatePet = function (req, res) {
    Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true})
        .then(updatedPet => res.status(200).json(updatedPet))
        .catch(err => res.status(400).json(err));
}

module.exports.incrementPetLikes = function (req, res) {
    Pet.findOneAndUpdate({ _id: req.params.id }, {$inc: {likes: 1}}, { new: true, runValidators: true})
        .then(updatedPet => res.json(updatedPet))
        .catch(err => res.status(400).json(err));
}

module.exports.deletePet = function (req, res) {
    Pet.deleteOne({ _id: req.params.id })
        .then(result => res.status(200).json({message: 'success'}))
        .catch(err => res.status(400).json(err));
}