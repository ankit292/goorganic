import Users from "../../../models/Users";
import connectDB from "../../../middleware/mongoose";
let bcrypt = require("bcryptjs");
const handler = async (req, res) => {
  if (req.method == "POST") {
    let { name, email, password } = req.body;

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    let user = await Users({ name, email, password: hash });
    let userDb = await Users.findOne({ email});
    
    if (userDb == null || user.email !== userDb.email) {
      await user.save();
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: "User allready exist" });
    }
  } else {
    res.status(500).json({
      success: false,
      error: "User allready exist! please find another one",
    });
  }
};
export default connectDB(handler);
