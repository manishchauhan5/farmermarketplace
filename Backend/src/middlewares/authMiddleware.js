import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
    const token = req.header("Authorization");        

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = decoded;

        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(401).json({ message: "Token is not valid" });
    }
};