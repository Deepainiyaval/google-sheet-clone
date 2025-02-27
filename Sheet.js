const mongoose = require("mongoose");

const SheetSchema = new mongoose.Schema({
  name: String,
  data: [[String]],
});

module.exports = mongoose.model("Sheet", SheetSchema);
