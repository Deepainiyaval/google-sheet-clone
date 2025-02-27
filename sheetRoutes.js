const express = require("express");
const router = express.Router();
const Sheet = require("../models/Sheet");

router.post("/create", async (req, res) => {
  const sheet = new Sheet(req.body);
  await sheet.save();
  res.json(sheet);
});

router.get("/:id", async (req, res) => {
  const sheet = await Sheet.findById(req.params.id);
  res.json(sheet);
});

module.exports = router;
