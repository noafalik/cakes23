const express = require("express");
const { CakeModel, validateCake } = require("../models/cakeModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = await CakeModel.find({}).limit(5);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.post("/", async (req, res) => {
  let validBody = validateCake(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details)
  }
  try {
    let cake = new CakeModel(req.body);
    await cake.save();
    res.status(201).json(cake);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.put("/:id", async (req, res) => {
  let validBody = validateCake(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details)
  }
  try {
    let id = req.params.id;
    let data = await CakeModel.updateOne({_id:id},req.body);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await CakeModel.deleteOne({_id:id});
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

module.exports = router;