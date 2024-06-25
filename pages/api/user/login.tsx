import Users from '../../../models/Users';
import connectDB from '../../../middleware/mongoose'
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const handler = async (req, res)=>{
    if(req.method == "POST"){
        let { email,password } = req.body;
        
        let user = await Users.findOne({email});
        let loginPass = await bcrypt.compare(password, user.password);

        if(user){
            if(user.email == req.body.email && loginPass){
                var token = jwt.sign({ email:user.email,name:user.name }, process.env.JWT_SECRET,{ expiresIn: '1d' });
                res.status(200).json({success:true , token})
            }else{
                res.status(400).json({success:false , error:'Invalid credential'})
            }
        }else{
            res.status(500).json({success:false , error:'User not found'})
        }
    }
    
}
export default connectDB(handler);