import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not logged in"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export { isAuthenticated };
