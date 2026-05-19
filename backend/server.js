const express=require("express")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())

const users=[

{
email:"demo@netflix.com",
password:"123456"
},

{
email:"test@gmail.com",
password:"test123"
},

{
email:"user@gmail.com",
password:"user123"
}

]

app.post("/login",(req,res)=>{

const {email,password}=req.body

const user=users.find(
user=>
user.email===email &&
user.password===password
)

if(user){

res.status(200).json({

success:true,
message:"Login successful"

})

}else{

res.status(401).json({

success:false,
message:"Invalid email or password"

})

}

})

app.listen(5000,()=>{

console.log(
"Server running on port 5000"
)

})