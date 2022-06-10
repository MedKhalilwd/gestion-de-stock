const mongoose = require('mongoose');
const providerSchema = new mongoose.Schema({
ref:{
    type:String,
    require:true,
},
products:
    {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },



})
module.exports= User.discriminator("Provider",providerSchema)