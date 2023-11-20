"use strict";

const { request } = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const database = "ECommerceWebsite";
const collectionName = "Items";

const showCart = async (request, response) => {
  try {

  await client.connect();
  const db = client.db(database);
  console.log("connected!");

  const cart = await db.collection("Cart").find().toArray();

      if (!cart || cart.length < 1) {
        return response
        .status(401)
        .json({ status: 401,  message : "You cart seem empty... You need to provide an array of object and for each item provide a key of _id and a key of quantityBuy."});
        }

    //Getting all the items in the cart
    const getAllItemFromDatabase = cart.map(itemInCart => {
      return db.collection(collectionName).findOne({_id : Number(itemInCart._id)});
    })

    const allItemFoundInDatabase = await Promise.all(getAllItemFromDatabase);


    if(allItemFoundInDatabase.some(item => !item)) {
      return response
      .status(404)
      .json({status:404, message : "some item were not found, please verify the id of each item in the cart" })
    }

    const itemsInCart = cart.map((item, index) => {
      return Object.assign(allItemFoundInDatabase[index], {quantityBuy : item.quantityBuy} )
    })

    return response
    .status(200)
    .json({status:200, data : itemsInCart,  message : "We get the cart from the database sucessfully" })
  
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

module.exports = showCart;