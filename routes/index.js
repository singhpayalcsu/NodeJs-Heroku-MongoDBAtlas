var express = require('express');
var router = express.Router();

const { MongoClient } = require("mongodb");


const uri = process.env.MONGODB_URI;

/* GET home page. */
router
.get('/', function(req, res, next) {
  res.render('index', { title: 'MongoDB' });
})
.get('/mongodb', async (req, res) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
   
  
  try {
    await client.connect();
    await listRowOfDataBase(client, res);
  
  } catch(err) {
    console.log(err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
 });

module.exports = router;

async function listRowOfDataBase(client, res) {
    const result = await client.db("myFirstDatabase").collection("myFirstDatabaseCollection").find().toArray();;

    console.log(result);
    res.render('mongodb', {"results": result});
};
