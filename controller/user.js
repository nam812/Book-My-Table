import ErrorHandler from "../middlewares/error.js";
import {Users} from "../models/user.js";
import jwt from "jsonwebtoken";
//import bcrypt from "bcrpytjs";
import bcrypt from "bcrypt";

const createUser= async(req, res, next)=>{
    const {email, password, username} = req.body;
    if(!username || !password || !email)
    {
        res.status(400);
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const userAvailable= await Users.findOne({username});
    if(userAvailable)
    {
        res.json({"message":"username already exists"});
        return next(new ErrorHandler("username already exists", 400));
    }
    try{
        const hashedpassword= await bcrypt.hash(password, 10);
        const user = await Users.create({email, password: hashedpassword, username});
        res.json(user);
    } 
    catch(error){
        return next(error);   
    }

}


const loginUser= async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password)
    {
        return next(new ErrorHandler("enter all fields", 400));
    }
    const user= await Users.findOne({email});
    
    if(await bcrypt.compare(password, user.password))
    {
        const accessToken= jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
           },
           process.env.ACCESS_TOKEN_SECRET ,
           {expiresIn: "15m" }
    
    )
        res.status(200).json({accessToken});
}
        else{
            res.status(401);
            throw new Error("password is not valid");
        }
    


    }
   



export default {createUser, loginUser};