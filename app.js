const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/ItemModel");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use("/styles", express.static("styles"));

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://elvinooo1990:22Bb9061990@cluster0.nuzxezw.mongodb.net/todolistDB",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to mongo db database");
    app.listen(process.env.PORT || 8000, () => {
      console.log("Successfully connected on port 8000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
const itemsSchema = new mongoose.Schema({
  name: String,
});

app.get("/", async (req, res) => {
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
});

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
