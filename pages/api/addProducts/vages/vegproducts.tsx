import Vages from '../../../../models/allproducts/vagesAll';
import connectDB from '../../../../middleware/mongoose'

const handler = async (req, res)=>{
    if(req.method == "POST"){
        for(let i=0;i<req.body.length;i++){
        let p = new Vages({
            title:req.body[i].title,
            slug:req.body[i].slug,
            desc:req.body[i].desc,
            img:req.body[i].img,
            category:req.body[i].category,
            price:req.body[i].price,
            availableQty:req.body[i].availableQty
        })
        await p.save();
        
    }
    res.status(200).json({success:'success'})
    }else{

        res.status(400).json('error')
    }

}
export default connectDB(handler);