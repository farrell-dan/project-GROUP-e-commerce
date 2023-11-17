//Add to cart Enpoint

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// Function to create a new collection for carts with an initial item or add an item to an existing cart
const addToCart = async (req, res) => {
  // // Check if "name" is present in the request body
  // if (!req.body.name) {
  //   return res.status(400).json({ error: "Name is required in the request body" });
  // }

  const client = new MongoClient(MONGO_URI);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db("ECommerceWebsite");

    // Check if "Cart" collection exists
    const cartsCollection = db.collection("Cart");

    // Get item details from the request body
    const { _id, quantityBuy } = req.body;

    // Check if the cart exists
    const cartExists = (await cartsCollection.find({}).count()) > 0;
    
    if (!cartExists) {
      // If the cart does not exist, create a new collection for carts
      await cartsCollection.insertOne({ _id, quantityBuy });

      res.status(201).json({
        message: "Cart created successfully with the initial item",
        data: { _id, quantityBuy },
      });
      console.log("Cart created successfully with the initial item");
    } else {
      // If the cart exists, check if the item already exists
      const existingItem = await cartsCollection.findOne({ _id });

      if (existingItem) {
        // If the item already exists, update the quantityBuy
        const updatedQuantity = existingItem.quantityBuy + 1;

        await cartsCollection.updateOne(
          { _id },
          { $set: { quantityBuy: updatedQuantity } }
        );

        res.status(200).json({
          message: "Quantity updated in the existing cart",
          data: { _id, quantityBuy: updatedQuantity },
        });
        console.log("Quantity updated in the existing cart");
      } else {
        // If the item does not exist, insert a new item into the cart
        await cartsCollection.insertOne({ _id, quantityBuy });

        res.status(201).json({
          message: "Item added to the cart successfully",
          data: { _id, quantityBuy },
        });
        console.log("Item added to the cart successfully");
      }
    }
  } catch (error) {
    console.error("Error creating or adding to the cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
};

// Export the function to create or add to the cart
module.exports = addToCart;
