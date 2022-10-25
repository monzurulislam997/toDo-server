const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express()
const port = 5000;
const cors = require('cors')
app.use(express.json())
app.use(cors())
// PcuNcNasIKJO7jRg


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2bjc4l4.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://toDoApp:PcuNcNasIKJO7jRg@cluster0.2bjc4l4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    await client.connect()
    const itemsCollection = client.db("toDoApp").collection('items')

    try {

        app.post('/addItem', async (req, res) => {
            const item = req.body;
            console.log(item);
            const result = await itemsCollection.insertOne(item)

            res.send(result)
        })

        app.get('/allitems', async (req, res) => {
            const query = {}
            const result = await itemsCollection.find(query).toArray()
            res.send(result)
        })




    }

    catch {
        // await client.close()
    }



}


run().catch(console.dir)


app.get('/', (req, res) => {
    res.send("Hello todo")
})

app.listen(port, () => {
    console.log('server is running');
})