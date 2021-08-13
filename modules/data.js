const mongoose = require('mongoose');

const wikiScema = new mongoose.Schema({
    title:{
        type: String
    },
    content:{
        type: String
    }
})

const Articles = mongoose.model("articles", wikiScema);

module.exports = Articles;