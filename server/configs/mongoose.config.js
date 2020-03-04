const mongoose = require('mongoose');

mongoose
    .connect(`mongodb://localhost/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "e-prostats"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

module.exports = mongoose;