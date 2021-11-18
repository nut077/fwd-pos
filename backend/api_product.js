const express = require("express");
const router = express.Router();
const Products = require("./models/product_schema");
//const { interceptor1, interceptor2 } = require("./my_intercept");
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");

router.get("/product", async (req, res) => {
  const doc = await Products.find();
  res.json({ result: doc });
});

// Add Product
router.post("/product", async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let doc = await Products.create(fields); // insert
      await uploadImage(files, doc); // save image
      res.json({ result: "ok", message: doc }); // reply result
    });
  } catch (e) {
    res.json({ result: "nok", message: e });
  }
});

// Upload Image
const uploadImage = async (files, doc) => {
  if (files.image != null) {
    let fileExtention = files.image.originalFilename.split(".")[1];
    doc.image = `${doc.product_id}.${fileExtention}`;
    let newpath =
      path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;

    if (fs.existsSync(newpath)) {
      await fs.remove(newpath);
    }
    await fs.move(files.image.filepath, newpath);

    // Update database
    await Products.findOneAndUpdate({ product_id: doc.product_id }, doc);
  }
};

module.exports = router;
