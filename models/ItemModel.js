const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Empty value is not acceptable"],
  },
});
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
