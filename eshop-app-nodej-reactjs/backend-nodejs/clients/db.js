const mongoose = require("mongoose");

// MongoDB URI from environment variables
const mongoURI =
  "mongodb+srv://taner16:taner123@cluster0.guofsiq.mongodb.net/ecommerce-nodejs";

// console.log("MongoDB URI:", mongoURI);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
