const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const getUniqueCategories = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
  
    try {
      await client.connect();
      const db = client.db("ECommerceWebsite ");
  
      const categories = await db.collection("Items").distinct("category");
  
      if (categories && categories.length > 0) {
        res.status(200).json({ data: categories });
        console.log(categories)
      } else {
        res.status(404).json({ error: "No categories found :(" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    } finally {
      client.close();
    }
  };
  
  module.exports = getUniqueCategories;