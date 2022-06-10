const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
 

  
})

module.exports= mongoose.model("Language", languageSchema)