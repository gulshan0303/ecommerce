const mongoose = require('mongoose');



//database connection
const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('database connected!!');
    } catch (error) {
      console.log(error);
      
    }
}  

module.exports = dbConnection;