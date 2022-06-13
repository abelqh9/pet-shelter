const mongoose = require('mongoose');

module.exports.connectWithMongo = function () {
    mongoose.connect('mongodb://localhost:27017/pet-shelter-app')
        .then(() => console.log('Database connection stablished'))
        .catch(err => console.log('There Was an error with the database connection', err));
} 
