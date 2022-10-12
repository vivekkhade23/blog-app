const express = require('express')
const UserModel = require("./User.model.js")
const jwt=require("jsonwebtoken")


const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.post("/signup",async (req, res) => {
    const { email, password, age } = req.body;
    console.log(email, password, age);
    const user = new UserModel({ email, password, age })
    await user.save();
    res.send("user created successsfully");
})

app.post("/login",async (req, res) => {
    const { email, password} = req.body;
    const user =await  UserModel.findOne({ email,password });
   if(!user){
    return res.send("Invalid credentials");
   }
   const token=jwt.sign(
    {id:user._id,email:user.email,age:user.age},
    "SECRET1234",
    {
        expiresIn:"7 days"
    }
    )
   res.send({message:"Login successful",token});
})

app.get("/:id",async(req,res)=>{
const {id}=req.params;
const token =req.headers["authorization"];
if(!token){
    return res.status(401).send("Unauthorized");
}
try{
    const verification =jwt.verify(token,"SECRET1234");
console.log("verification", verification);
const user=await UserModel.findById(id);
return res.send(user);

}
catch(e){
    console.log(e.message);
    return res.status(401).send("Token is Invalid")
}
})

module.exports=app;