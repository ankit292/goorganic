import Plants from '../../../../models/allproducts/plantsall';
import connectDB from '../../../../middleware/mongoose'

const handler = async (req, res)=>{
    let products = await Plants.find();
    res.status(200).json({products})

}
export default connectDB(handler);