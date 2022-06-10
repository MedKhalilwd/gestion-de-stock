const mongoose = require("mongoose");


const userSchema =new mongoose.Schema({

    fullname:{
       type:String,
       require:true,
       trim:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    age:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    availability:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    yearExperience:{
        type:String,
        require:true
    },
    about:{
        type:String,
        require:true
    },
    // Language:{
    //     type:String,
    //     require:true
    // },
 
    confirme: {
        type: Boolean,
        default: false,
      },
    role: {
        type: String,
        enum: ["admin", "provider"],
      },

      cas:{
        type: Boolean,
        default: false,
      },
      picture:{
        type:String,
        require:true,
    },
},
{ timestamps: true }
);
module.exports = mongoose.model("User", userSchema)