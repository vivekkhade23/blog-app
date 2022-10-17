const dbConnect = require("./config/db");
const express=require("express")
const cors=require("cors")
const userRouter =require("./fetures/User/User.router")
const googleRouter=require("./fetures/userGoogle/UserGoogle.router")


let PORT = 8080;
const app = express();

app.use(cors())
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", googleRouter);



app.listen(PORT, async () => {
    await dbConnect();
    console.log(`Listening on http://localhost:${PORT}`);
  });