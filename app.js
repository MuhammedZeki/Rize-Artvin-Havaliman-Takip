const express = require("express")
const path = require("path")
const app = express();
app.use(express.urlencoded({ extended: true }));
const adminRouter=require("./router/admin")
const userRouter=require("./router/user")

app.set("view engine","ejs")

app.use("/libs",express.static(path.join(__dirname,"node_modules")))
app.use("/static",express.static(path.join(__dirname,"public")))

app.use(adminRouter)
app.use(userRouter)

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})