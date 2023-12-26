import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        return res.status(401).json({ status: "Something went wrong." });
    }
};

const LOGIN = async (req, res) => {
    try{
        const user = await UserModel.findOne({ email: req.body.email });

        if(!user) {
            return res.status(401).json({ message: "Bad authentification (email or password is wrong)" });
        }

        bcrypt.compare(req.body.password, user.password, (err, isPasswordmatch) => {
            if (!isPasswordmatch || err){
                return res.status(401).json({ message: "Bad authentification (email or password is wrong)" });
            }

            const token = jwt.sign(
                {user_id: user._id},
                process.env.JWT_SECRET,
                { expiresIn: "12h" },
                { algorithm: "RS256"}
            );

            return res.status(200).json({ message: `${user.name} logged in.`, token })
        })
    }
    catch (err) {
        return res.status(401).json( {message: "Something went wrong." });
    }
}

export { REGISTER_USER, LOGIN,}