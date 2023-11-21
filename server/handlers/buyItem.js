//Route where we validate if we can buy the items


"use strict";

const { request } = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const collectionName = "Items"
const database = "ECommerceWebsite"

// "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
// "price": "$49.99",
// "body_location": "Wrist",
// "category": "Fitness",
// "_id": 6543,
// "imageSrc": "data:image/jpeg;base64,,
// "numInStock": 9,
// "companyId": 19962
// },


const Cart = [
{
  _id : 9999,
  quantityBuy : 0,
}
]

const BuyItem = async (request, response) => {

  const itemsOutOfStock = [];
  const listOfItemAvailableToBuyInDatabase = [];

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

    //function to verify quantity between the item in stock and the item in cart
    allItemFoundInDatabase.map((itemFoundInDatabase, index) => {

      if ((cart[index]).quantityBuy > (Number(itemFoundInDatabase.numInStock)) ) {
        itemsOutOfStock.push(itemFoundInDatabase);
      }else {
        listOfItemAvailableToBuyInDatabase.push(itemFoundInDatabase)
      }
    })

    if (listOfItemAvailableToBuyInDatabase.length < 1) {
      return response
      .status(401)
      .json({status:401, message : "We are sorry to tell you that the ammount you ask for the items in your cart is out of stock" })
    }


    const PromisesOFUpdatingStock = listOfItemAvailableToBuyInDatabase.map((itemAvailableTobUyInDatabase, index) => {

      const updateStock= itemAvailableTobUyInDatabase.numInStock - (cart[index]).quantityBuy;

      return db.collection(collectionName).updateOne({_id : Number(itemAvailableTobUyInDatabase._id)}, { $set: { "numInStock" : updateStock }});
    })

    const listOfItemsBuyInCart = await Promise.all(PromisesOFUpdatingStock);

    if (!listOfItemsBuyInCart || listOfItemsBuyInCart.matchedCount < 1 || listOfItemsBuyInCart.modifiedCount < 1) {
      return response
      .status(404)
      .json({status:404, message : "An error occured in your order, please contact the client service" })
    }

    //delete old cart
    const deletedCart = await db.collection("Cart").drop({});

    if (!deletedCart) {
      return response
      .status(401)
      .json({status:401, message : "There was an errro with the deletion of the cart" })
    }

      return response
      .status(200)
      .json({status:200, message : "purchase successful", itemInStock: listOfItemAvailableToBuyInDatabase , itemsOutOfStock : itemsOutOfStock });
  }

  catch(error) {
    console.error(error.stack);
    return response
    .status(500)
    .json({status:500, message : " Unexpected Error with the server", itemsOutOfStock: itemsOutOfStock });

  } finally {
  client.close();
  console.log("disconected!");
    }
}

module.exports = BuyItem;
