const dotenv=require('dotenv')
dotenv.config()
const express=require('express');
const cors=require('cors')

const router=require("./routes/index")
const app=express()


app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true
}))
app.use(express.json({limit:"32kb"}));
app.use(express.urlencoded({extended:true}))



app.get("/",(req,res)=>{  
  
    res.send("hello world");
})

app.use('/api',router)


// const server=http.createServer(app);
// server.listen(3000,()=>{
//     console.log("server is running on port 3000");
// });

app.listen(3000,()=>{
    
    console.log("server is running on port 3000");
})