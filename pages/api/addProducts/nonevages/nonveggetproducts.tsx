import NonVages from '../../../../models/allproducts/nonvagesAll';
import connectDB from '../../../../middleware/mongoose'

const handler = async (req, res)=>{
    let products = await NonVages.find();
    res.status(200).json({products})

}
export default connectDB(handler);