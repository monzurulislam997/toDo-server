const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
require('dotenv').config()
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2bjc4l4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    await client.connect()
    const itemsCollection = client.db("toDoApp").collection('items')

    try {

        app.post('/addItem', async (req, res) => {
            const item = req.body;

            const result = await itemsCollection.insertOne(item)

            res.send(result)
        })

        app.get('/allitems', async (req, res) => {
            const query = {}
            const result = await itemsCollection.find(query).toArray()
            res.send(result)
        })
        //delete item
        app.delete('/delete/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const deleteItem = await itemsCollection.deleteOne(query)
            res.send(deleteItem)

        })

        //update item
        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const info = req.body;
            console.log(info);
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                    name: info?.updateItem
                }
            }

            const result = await itemsCollection.updateOne(query, updateDoc, options)
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