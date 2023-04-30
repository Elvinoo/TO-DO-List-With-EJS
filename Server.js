const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const Item = require("./models/ItemModel");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use("/styles", express.static("styles"));

const PORT = process.env.PORT || 8000;
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on the port " + PORT);
  });
});
/* mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongo db database");
    app.listen(Port, () => {
      console.log(`Successfully connected on ${Port}!`);
    });
  })
  .catch((err) => {
    console.log(err);
  }); */
const itemsSchema = new mongoose.Schema({
  name: String,
});
app.get("/", (req, res) => {
  res.json({ message: "fuck You" });
});

/* app.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    const today = new Date();
    const currentDay = today.getDay();
    const year = today.getFullYear();
    let day = new Date().toLocaleString("en", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
    res.render("list", { kindOfDay: day, newListItem: items, year: year });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}); */

app.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});
app.post("/delete", async (req, res) => {
  const itemId = req.body.itemId;
  try {
    await Item.findByIdAndRemove(itemId);
    console.log("Successfully deleted");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
  //
});
