const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
         trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
      
    },
    category:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"Category",
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
    },
    ratings:[{
        star:Number,
        comment:String,
        postedBy:{
            type:mongoose.Schema.Types.ObjectId,ref:"User"}
    }],
    color:{
        type:String,
        required:true
        // enum:['Black','Brown','Red']
    },
    brand:{
        type:String,
        required:true
        // enum:['Apple','Samsung','Vivo']
    },
    sold:{
        type:Number,
        default:0
    },
    totalRating:{
        type:String,
        default:0,
    }

},{timestamps:true});

//Export the model
module.exports = mongoose.model('Product', productSchema);