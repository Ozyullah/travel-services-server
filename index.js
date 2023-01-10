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

        const reviewCollections=client.db("travelData").collection("reviews")

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

        app.post('/services', async(req, res)=>{
            const stead=req.body;
            const effect =await servicesCollection.insertOne(stead);
            res.send(effect)
        })


        // Review Sectore

        app.post('/reviews', async(req, res)=>{
            const reviw =req.body;
            const result =await reviewCollections.insertOne(reviw);
            res.send(result);
        })

        app.get('/reviews', async(req, res)=>{
            let query={};
            if(req.query.email){
                query={
                    email:req.query.email
                }
            }
            const aqua =reviewCollections.find(query);
            const files =await aqua.toArray()
            res.send(files)
        })

        app.get('/opinion', async(req, res)=>{
            let query ={};
            if(req.query.service_id){
                query={
                    service_id:req.query.service_id
                }
            }
            const single=reviewCollections.find(query);
            const desires =await single.toArray();
            res.send(desires)
        })

        app.delete('reviews/:id', async(req, res)=>{
            const id =req.params.id;
            const query ={_id: ObjectId(id)};
            const result=await reviewCollections.deleteOne(query);
            res.send(result)
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