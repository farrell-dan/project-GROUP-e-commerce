"use strict";

// build your server here

// consider making one or more handler files to ease the  division of work

const express = require("express");
const morgan = require("morgan");

const {
  getUniqueCategories,
  getItemsbyCategory,
  buyerVerification,
  buyItem,
  getItemByID,
  addToCart,
  showCart,
  deleteItemFromCart
} = require("./handlers")


const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
//Need to add the updated MONGO_URI to the .env file in server folder

const PORT = 8888;

const app = express();

app.use(morgan("tiny"))
app.use(express.json())

app.get("/api/test", (req, res) => {
  res.json({ message: "You hit the end point!" });
});

//Can use for the homepage to get the 7 unique categories
app.get("/api/Categories" ,getUniqueCategories)

//Used to get all the items of one category
app.get("/api/getItemsByCategory/:category", getItemsbyCategory)

//Add Items to Car
app.post("/api/addToCart", addToCart)

app.get("/api/getItemById/:_id", getItemByID)

app.get("/api/BuyItem", buyItem)

app.get("/api/cart", showCart)

app.patch("/api/deleteItemFromCart", deleteItemFromCart)

app.post("/api/validateCard", buyerVerification)

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

