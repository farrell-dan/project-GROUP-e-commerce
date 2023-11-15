
"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const collectionName = "Items"
const database = "ECommerceWebsite"


// Get a specific item by his ID

const getItemByID = async (request, response) => {
  const { _id } = request.params;

  console.log(_id);

  if (!_id) {
  return response
  .status(401)
  .json({ status: 401,  message : "You need to provide an Id to access this endoint"});
}    
    try {

      await client.connect();
      const db = client.db(database);
      console.log("connected!");

      //retrieve Id in the database 
      const item = await db.collection(collectionName).findOne({_id : Number(_id)});

      if (!item || item.matchedCount === 0) {
          return response
          .status(404)
          .json({ status: 404, _id, message : `Item not found, please verify the item Id : ${_id} was not found` });
        }  

        //after all test is passed 
        return response
        .status(200)
        .json({status:200, message : "Item sucessfully found: ", item : item });
  }
  
  catch(error) {
    console.log(error.stack);
    return response
    .status(500)
    .json({status:500, message : " Unexpected Error with the server" });
  
  } finally {
  client.close();
  console.log("disconected!");
    }
}

// module.exports = getItemByID;

//----------DELETE EVERYTHING AFTER THIS LINE AFTER MERGE-----------------------------------------//


"use strict";

// build your server here

// consider making one or more handler files to ease the  division of work

const express = require("express");

//Need to add the updated MONGO_URI to the .env file in server folder

const PORT = 8888;

const app = express();

app.get("/api/test", (req, res) => {
  res.json({ message: "You hit the end point!" });
})

app.get("/api/getItemById/:_id", getItemByID)

//test MongoDB get w/ db & collection names used as examples, 
app.get("/api/testMongo", async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const result = await client
      .db("portfolio-project")
      .collection("people")
      .insertOne({ name: "Jimmy" });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "something went wrong" });
  } finally {
    await client.close();
  }
});

app.listen(PORT);




