const mongoose = require('mongoose');

const connectDB = handler => async (req,res)=>{
  if(mongoose.connections[0].readyState){
    return handler(req,res)
  }
  try {
    mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true,family:4 }).then(() => {
        return handler(req, res)
    })
    .catch(() => {
        console.log("BAD mongoose.tsx");
    })
     
     
  } catch (error) {
    console.log('error mongo db not conneted')
  }
  
}
export default connectDB;