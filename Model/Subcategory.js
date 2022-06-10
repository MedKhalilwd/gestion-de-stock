const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        unique: true,
        minlength: 2,
        trim: true
    },

    description: {
        type: String,
        require: true
    },
    categorie: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      

    },
//  products:[
//      {
//          type: mongoose.Types.ObjectId,
//          ref: 'Product',
//      },
//  ],
})

module.exports= mongoose.model("SubCategory", subcategorySchema)