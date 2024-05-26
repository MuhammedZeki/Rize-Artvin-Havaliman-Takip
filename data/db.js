const config = require("./config")
const mysql=require("mysql2")

const connection=mysql.createConnection(config.db)

connection.connect((err)=>{
    if(err){
       return console.log(err)
    }
    console.log("Server Bağlandı")
})
module.exports=connection.promise();