const express = require("express");
const mongoose = require("mongoose");
const MessageModel = require("./MessageModel");

process.on("SIGINT", () => {
  console.log("Caught interrupt signal");
  process.exit();
});

process.on("SIGTERM", () => {
  console.log("Caught interrupt signal");
  process.exit();
});

(async () => {
  const app = express();

  console.log("Connecting to MongoDB");
  await mongoose.connect("mongodb://mongodb:27017/tom", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected");

  app.get("/", (req, res) => {
    console.log("Got a request");
    res.json({
      message: "Hey, I'm Tom, the API",
      date: new Date().toISOString(),
    });
  });

  app.get("/about", (req, res) => {
    console.log("Got a request to /about");
    res.json({
      message: "This is the About section of the API",
      version: "1.0.0",
    });
  });

  app.post("/", async (req, res) => {
    console.log("Got a post");
    const message = new MessageModel({ sentence: "Hey I'm a new post!" });
    const result = await message.save();
    res.json({ message: "Hey, I saved a post", result });
  });

  app.listen(5000, () => {
    console.log("Server is running");
  });
})();
