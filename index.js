const express= require('express');
const cors =require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app =express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.vkwd2pr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try {
        const servicesCollection= client.db("travelData").collection("services");


        app.get('/systems', async(req, res)=>{
            const query={};
            const items= servicesCollection.find(query);
            const favores =await items.limit(3).toArray();
            res.send(favores)
        })


        app.get('/services', async(req, res)=>{
            const query ={};
            const listes= servicesCollection.find(query);
            const known =await listes.toArray();
            res.send(known)
        })


        app.get('/services/:id', async(req, res)=>{
            const id =req.params.id;
            const query ={ _id: ObjectId(id)};
            const rolles =await servicesCollection.findOne(query);
            res.send(rolles)
        })
 
    }
    finally{
       
    }
}
run().catch(console.dir) 


app.get('/', (req, res)=>{
    res.send('Travel Services Started')
});

app.listen(port, ()=>{
    console.log(`Travel Services  server on: ${port}`)
})