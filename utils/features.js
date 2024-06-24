import jwt from "jsonwebtoken";


export const sendCookie = (newUser,res,message,statusCode)=>{
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 *60 * 1000,
        // sameSite: "none",
        // secure : true
    })
        .json({
            success: true,
            message_login: message,
            user: newUser
        });
}




