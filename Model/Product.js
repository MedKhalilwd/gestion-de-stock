const mongoose = require('mongoose');
const GallerySchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
      require: true,
    },
  });
const productSchema = new mongoose.Schema({

    refProd:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    quantite:{
        type:String,
        require:true
    },
    prix:{
        type:String,
        require:true
    },
    picture:{
        type:String,
    },
    description:{
        type:String,
        require:true
    },
   
    provider: {
        type: mongoose.Types.ObjectId,
        ref: "Provider",
      },
      gallery: [GallerySchema],

})

module.exports= mongoose.model("Product", productSchema)