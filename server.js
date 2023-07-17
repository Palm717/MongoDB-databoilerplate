import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateFakeData = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }

  try {
    const db = client.db("testDB");
    const testColl = db.collection("testColl");

    const data = [];
    for (let i = 0; i < 100; i++) {
      const fakeRecord = {
        name: faker.location.firstName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
      };
      data.push(fakeRecord);
    }

    await testColl.insertMany(data);
    console.log("Data insertion successful");
  } catch (err) {
    console.error("Error inserting data into MongoDB", err);
  } finally {
    try {
      await client.close();
    } catch (error) {
      console.error("Error closing MongoDB connection", error);
    }
  }
};

generateFakeData().catch(console.error);
