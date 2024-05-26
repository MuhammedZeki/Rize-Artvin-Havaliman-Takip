const express = require("express")
const router = express.Router()

//ANASAYFA
router.use("/",async(req,res)=>{
    try{
        res.render("users/index",{
            title:"Anasafya"
        })
    }
    catch(err){console.log(err)}
})

module.exports=router