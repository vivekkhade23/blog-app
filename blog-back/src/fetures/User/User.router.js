const express = require('express')
const UserModel = require("./User.model.js")
const jwt=require("jsonwebtoken")


const app = express.Router();

const blacklist=[];

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
        expiresIn:"1 hr"
    }
    )
    const refreshtoken=jwt.sign({},
        "REFRESHSECRET1234",
        {
            expiresIn:"7 days"
        }
    )
   res.send({message:"Login successful",token,refreshtoken});
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
    if(e.message==="jwt expired"){
        blacklist.push(token)
    }
    return res.status(401).send("Token is Invalid")
}
})

app.post("/refresh",async(req,res)=>{
    const refreshtoken=req.headers.authorization;
if(blacklist.includes(refreshtoken)){
    return res.status(401).send("Token is blacklisted")
}
    try{
    const data=jwt.verify(refreshtoken,"REFRESHSECRET1234")
const maintoken=jwt.sign(data,"SECRET1234")
return res.send({token:maintoken})
    }catch(e){
return res.send("refresh token invalid");
    }
})

app.post("/logout",(req,res)=>{
    const token =req.headers.authorization;
    blacklist.push(token);
    res.send("logout success")
})

//github
app.get('/github', (req, res) => {
    res.sendFile(__dirname+"/Login.jsx")
    
    })
app.get('/github/callback', (req, res) => {
    console.log(req.query.code);
    res.send("sign in with github successfully")
    
    })





module.exports=app;