import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
        if (err){
            return res.status(401).json({ message: "Please login again."});
        }
        req.body.user_id = decoded.user_id;
        return next();
    });
};

export { authenticateUser };