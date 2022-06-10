const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    description: {
        type: String,
        require: true,
        trim: true
    },
    sub_categories: [
        {
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory'
    },
],
})

module.exports= mongoose.model("Category", categorySchema)