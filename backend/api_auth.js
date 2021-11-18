const express = require("express");
const router = express.Router();
const Users = require("./models/user_schema");
const Feedbacks = require("./models/feedback_schema");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  try {
    let doc = await Users.findOne({ username: req.body.username });
    if (doc) {
      const isValid = await bcrypt.compare(req.body.password, doc.password);
      if (isValid) {
        res.json({ result: "ok", message: doc });
      } else {
        res.json({ result: "error", message: "Invalid password" });
      }
    } else {
      res.json({ result: "error", message: "Invalid user" });
    }
  } catch (e) {
    res.json({ result: "error", message: e });
  }
});

router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const doc = await Users.create(req.body);
    res.json({ result: "ok", doc });
  } catch (e) {
    res.json({ result: "error", e });
  }
});

router.post("/feedback", async (req, res) => {
  try {
    const doc = await Feedbacks.create(req.body);
    res.json({ result: "ok", message: doc });
  } catch (e) {
    res.json({ result: "error", message: e });
  }
});

module.exports = router;
