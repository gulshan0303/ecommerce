const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
       
    },
    lastName:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    refreshToken:{
       type:String
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  
},{timestamps:true});


 //hashed password
userSchema.pre("save", async function (next) {
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password,salt);
  });
 
  //compare password

  userSchema.methods.isPasswordMatch = async  function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
  }
//Export the model
module.exports = mongoose.model('User', userSchema);