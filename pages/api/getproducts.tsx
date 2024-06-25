import Product from '../../models/Products';
import connectDB from '../../middleware/mongoose'

const handler = async (req, res)=>{
    let products = await Product.find();
    res.status(200).json({products})

}
export default connectDB(handler);