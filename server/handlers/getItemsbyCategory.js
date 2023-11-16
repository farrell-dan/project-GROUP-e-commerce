const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getItemsByCategory = async (req, res) => {
    const client = new MongoClient(MONGO_URI);

    let { category } = req.params;
        
    try {
        await client.connect();
        const db = client.db("ECommerceWebsite");   

        const items = await db.collection("Items").find( { category : { $regex: category,
        $options: "i" }}).toArray();



        if (items && items.length > 0) {
            res.status(200).json({ status: 200, message: "Here are your items", data: items });
            console.log(items);
        } else {
            res.status(404).json({ status: 404, message: `No items found for category: ${category}` });
            console.log(`No items found for category: ${category}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    } finally {
        client.close();
    }
};

module.exports = getItemsByCategory;