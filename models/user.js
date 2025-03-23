import mongoose from 'mongoose';
const userSchema= mongoose.Schema({
    username:{
        type : String,
        required: [true, "please add user name "],
        unique:[true, "username already exists"],
    },
    email:{
        type:String,
        required: [true, "please add email"],
        //unique:[true, "email already exists"],
    },
    password:{
        type:String,
        required:[true, "please add user password"],
    },

},
{timestamps:true}
)
//module.exports=mongoose.model("users", userSchema)
export const Users = mongoose.model("Users", userSchema);