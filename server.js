const express = require("express");
const cors = require("cors");
const connectDb = require("./db.js");
const eventModel = require("./models/event.js")

const app = express();
app.use(express.json())
app.use(cors({
    origin: ["https://raymish-frontend.vercel.app/"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

connectDb();

//Get details Api

app.get('/',async(req,res)=>{
    const response = await eventModel.find()
    return res.json(response)
})

//Create Api

app.post('/create', async(req,res)=>{
    const {name,description,website,instagramLink,googleMapsLink,locality,city,category} = req.body
    const response = await eventModel(req.body)
    await response.save()
    return res.send({data:response})
})

//Update Api

app.put("/update/:id",async(req,res)=>{
    const id = req.params.id
    eventModel.findByIdAndUpdate({_id:id},{name:req.body.name,description:req.body.description,website:req.body.website,instagramLink:req.body.instagramLink,googleMapsLink:req.body.googleMapsLink,locality:req.body.locality,city:req.body.city,category:req.body.category})
    .then(res=> res.json(res))
    .catch(error=> res.json(error) )
})

// Delete API

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    eventModel.findByIdAndDelete({_id : id})
    .then(res=> res.json(res))
    .catch(error=> res.json(error) )
})

// Get Details By ID

app.get('/getuser/:id',(req,res)=>{
    const id = req.params.id;
    eventModel.findById({_id: id})
    .then(user=> res.json(user))
    .catch(error=> res.json(error) )

})

// filter API

app.get('/filtered-user/:input',(req,res)=>{
    const input = req.params.input
    //console.log(input)
    eventModel.find({category:input})
    .then(user=> res.json(user))
    .catch(error=> res.json(error) )
})

app.listen(3000,()=>{
    console.log(`Server Running at http://localhost:3000/`)
})
