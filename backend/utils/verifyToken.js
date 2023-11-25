import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js";


export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    
    if (!token) return next(createError(401, "Unauthorized"));

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(createError(401, "Unauthorized"));
        req.user = decoded;

        //retrive user id
        res.send(req.user)
        console.log(req.user);
    });
}


