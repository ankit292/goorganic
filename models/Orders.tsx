
const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    products:[{
        productId:{type:String},
        quantity:{type:String,required:true}
    }],
    address:{type:String,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:'panding', required:true},
},{timestamps:true})
mongoose.models = {}
export default mongoose.model('Order',OrdersSchema);