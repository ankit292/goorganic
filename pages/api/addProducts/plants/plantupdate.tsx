import Plants from '../../../../models/allproducts/plantsall';
import connectDB from '../../../../middleware/mongoose'

const handler = async (req, res)=>{
    if(req.method == "POST"){
        for(let i=0;i<req.body.length;i++){
        let p = await Plants.findByIdAndUpdate(req.body[i]._id,req.body[i])
        
    }
    res.status(200).json({success:'product updated'})
    }else{

        res.status(400).json('error = not update product')
    }

}
export default connectDB(handler);