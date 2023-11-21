const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;


const getUniqueCategories = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
  
    try {
      await client.connect();
      const db = client.db("ECommerceWebsite");
  
      const categories = await db.collection("Items").distinct("category");
  
      if (categories && categories.length > 0) {
        res.status(200).json({ status: 200, message: "Here are your categories", data: categories });
      } else {
        res.status(404).json({ status: 404, message: "No categories found :(" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    } finally {
      client.close();
    }
  };
  
  module.exports = getUniqueCategories;