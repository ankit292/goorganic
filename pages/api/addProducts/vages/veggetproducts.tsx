import Vages from '../../../../models/allproducts/vagesAll';
import connectDB from '../../../../middleware/mongoose'

const handler = async (req, res)=>{
    let products = await Vages.find();
    res.status(200).json({products})

}
export default connectDB(handler);