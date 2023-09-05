const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//abhijit_sarker
//mNOy9l4EPQxSOCp5



const uri = "mongodb+srv://abhijit_sarker:mNOy9l4EPQxSOCp5@cluster0.qeddfku.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,

    }
});

async function run() {
    try {
        await client.connect();

        const userCollection = client.db("usersDB").collection("users");

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();


            res.send(result);
        })

        app.get('/users/:id', async (req, res) => {
            id = req.params.id;
            const query = { _id: new ObjectId(id) };

            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('New User:', user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.put('/users/:id', async (req, res) => {
            id = req.params.id;
            const user = req.body;
            console.log(user);

            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.name
                }
            }
            const result = await userCollection.updateOne(filter, updatedUser, options);

            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('Delete User:', id);
            console.log('Delete User:', id);
            const query = { _id: new ObjectId(id) };

            const result = await userCollection.deleteOne(query);

            res.send(result);

        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('crud server running')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

