const express = require("express");
const router = express.Router();

router.get("/transaction", (req, res) => {
  res.json({ result: "transaction" });
});

module.exports = router;
