//Add to cart Enpoint

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// Function to create a new collection for carts with an initial item or add an item to an existing cart
const addToCart = async (req, res) => {


    // Check if "name" is present in the request body
    if (!req.body.name) {
      return res.status(400).json({ error: "Name is required in the request body" });
    }


  const client = new MongoClient(MONGO_URI);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db("ECommerceWebsite");

    // Check if "Carts" collection exists
    const collectionExists = await db
      .listCollections({ name: "Carts" })
      .hasNext(); //check if there is at least one more item in the results set

    // Get item details from the request body
    const {
      _id,
      name,
      price,
      body_location,
      category,
      imageSRC,
      quantity,
      companyid,
    } = req.body;

    if (!collectionExists) {
      // Create a new collection for carts
      const cartsCollection = await db.createCollection("Carts");

      // Add an initial item to the collection
      const initialCartItem = {
        name,
        price,
        body_location,
        _id,
        category,
        imageSRC,
        quantity,
        companyid,
      };

      // Insert the initial item into the "Carts" collection
      await cartsCollection.insertOne(initialCartItem);
      res.status(201).json({
        message: "Cart collection created successfully with the initial item",
        data: initialCartItem,
      });
      console.log("Cart collection created successfully with the initial item");
    } else {
      // Add a new item to the existing "Carts" collection
      const newItem = {
        name,
        price,
        _id,
        body_location,
        category,
        imageSRC,
        quantity,
        companyid,
      };

      // Insert the new item into the "Carts" collection
      await db.collection("Carts").insertOne(newItem);
      res.status(201).json({
        message: "Item added to the existing cart successfully",
        data: newItem,
      });
      console.log("Item added to the existing cart successfully");
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
