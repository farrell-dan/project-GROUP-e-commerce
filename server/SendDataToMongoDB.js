
const items = require("./data/items.json")

const companies = require("./data/companies.json")

const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const exportDataToMongoDb = async (data,collectionName,dbName ) => {
  try {
    
    await client.connect();
    
    const db = client.db(dbName);
    console.log("connected!");

    const result = await db.collection(collectionName).insertMany(data);

    

  }
catch (error) {
  console.error(error.stack);
}
finally {
  await client.close();
  console.log("disconnected!");
}

}

// exportDataToMongoDb(reservations, "flightReservations");
exportDataToMongoDb(items, "Items","ECommerceWebsite");
exportDataToMongoDb(companies, "Companies","ECommerceWebsite");
