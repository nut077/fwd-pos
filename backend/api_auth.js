const express = require("express");
const router = express.Router();
const Users = require("./models/user_schema");
const Feedbacks = require("./models/feedback_schema");
const bcrypt = require("bcryptjs");
const jwt = require("./jwt");
var randtoken = require("rand-token");
let refreshTokens = {};

router.post("/login", async (req, res) => {
  try {
    let doc = await Users.findOne({ username: req.body.username });
    if (doc) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        doc.password
      );
      if (isValidPassword) {
        const payload = {
          id: doc._id.toString(),
          level: doc.level,
          username: doc.username,
        };
        const token = jwt.sign(payload, "10000");
        const refreshToken = randtoken.uid(256);
        refreshTokens[refreshToken] = req.body.username;
        res.json({
          result: "ok",
          message: "Login successfully",
          token,
          refreshToken,
        });
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

let count = 1;
router.post("/refresh/token", function (req, res) {
  const refreshToken = req.body.refreshToken;
  console.log("Refresh Token : " + count++);

  if (refreshToken in refreshTokens) {
    const payload = {
      username: refreshTokens[refreshToken],
      level: "normal",
    };
    const token = jwt.sign(payload, "20000");
    res.json({ jwt: token });
  } else {
    console.log("Not found");
    return res
      .status(403)
      .json({ auth: false, message: "Invalid refresh token" });
  }
});

module.exports = router;
