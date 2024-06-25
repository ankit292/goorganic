import Fruits from '../../../../models/allproducts/fruitsAll';
import connectDB from '../../../../middleware/mongoose'

const handler = async (req, res)=>{
    let products = await Fruits.find();
    res.status(200).json({products})

}
export default connectDB(handler);