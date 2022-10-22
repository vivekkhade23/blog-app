const {Schema,model} = require("mongoose");

const UserSchema=new Schema({
    email:String,
    password:String,
    age:Number,
    role:{
        type:String,
        enum:["Admin", "Writer" , "User"]
    }
});

const UserModel=model("user",UserSchema);

module.exports=UserModel;