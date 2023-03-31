const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
    address:{
        type:String
    },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    passwordResetToken:String,
    passwordChangeAt:Date,
    passwordResetExpire:Date,
  
},{timestamps:true});


 //hashed password
userSchema.pre("save", async function (next) {
    if(!this.isModified('password')){
        next();
    }
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password,salt);
     next();
  });
 
  //compare password

  userSchema.methods.isPasswordMatch = async  function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
  }

  userSchema.methods.createPasswordResetToken = async function() {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resettoken).digest("hex");
    this.passwordResetExpire = Date.now() + 30 * 60 * 1000;
    return resettoken;
  }
//Export the model
module.exports = mongoose.model('User', userSchema);