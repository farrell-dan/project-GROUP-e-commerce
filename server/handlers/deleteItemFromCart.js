const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// Function to delete an item from the cart
const deleteItemFromCart = async (req, res) => {
  const { _id } = req.body;

  const client = new MongoClient(MONGO_URI);

  console.log({_id})
  try {
    await client.connect();

    const db = client.db("ECommerceWebsite");
    const cartCollection = db.collection("Cart");

    console.log(cartCollection)

    const deletedItem = await cartCollection.findOne({_id:_id});


    const deleteResult = await cartCollection.deleteOne({ _id });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "Item not found in the cart" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      data: deletedItem,
    });

    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item from the cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

module.exports = deleteItemFromCart;
