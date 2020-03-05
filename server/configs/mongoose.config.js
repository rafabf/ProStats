const mongoose = require('mongoose');

mongoose
    .connect(`${process.env.DB_REMOTE}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "e-prostats"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

module.exports = mongoose;