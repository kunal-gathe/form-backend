import express  from "express"
import cors from 'cors'
import mongoose from "mongoose"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/test3')
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(err))

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}) 

let User = new mongoose.model("User", userSchema)

app.post('/register' , (req, res)=>{
  const {name, email, password} = req.body;
  User.findOne({email: email})
  .then(()=>{
    let user = new User({
      name,
      email,
      password
    })
  
    user.save()
    .then(()=> console.log("Successful"))
    .catch((err)=>{console.log(err);})
  }) 
  
})

app.get('/userdata', async(req, res)=>{
      try {
        const data = await User.find({})
        res.send({status: 200, data:data})
      } catch (error) {
        console.log(error);
      }
})

app.listen(8000, ()=>{
  console.log('port running on 8000');
})
