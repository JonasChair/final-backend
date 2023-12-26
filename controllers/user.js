import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";

const REGISTER_USER = async (req,res) => {
    try{
        const checkEmail = await UserModel.findOne({ email: req.body.email });

        if (!checkEmail){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
    
            const user = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            })
    
            user.id = user._id;
    
            const response = await user.save();
    
            return res
                .status(200)
                .json({ status: `User ${response.name} registered`});
        } else {
            return res.status(409).json({ status: "this email already registered!" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Something went wrong."});
    }
};

export { REGISTER_USER,}