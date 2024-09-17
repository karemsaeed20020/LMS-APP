const mongoose = require('mongoose');


const dbConnect = async () => {
  return await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
};
module.exports = dbConnect;