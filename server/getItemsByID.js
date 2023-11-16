
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

const BuyItem = require("./BuyItem")

const express = require("express");
const morgan = require("morgan");

express()
    // Below are methods that are included in express(). We chain them for convenience.
    // --------------------------------------------------------------------------------

    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))

.get("/api/test", (req, res) => {
  res.json({ message: "You hit the end point!" });
})

.get("/api/getItemById/:_id", getItemByID)

.patch("/api/BuyItem", BuyItem)

//test MongoDB get w/ db & collection names used as examples, 
.get("/api/testMongo", async (req, res) => {
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
})

.listen(8000, () => console.log(`Listening on port 8000`));





