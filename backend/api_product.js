const express = require("express");
const router = express.Router();
const Products = require("./models/product_schema");
//const { interceptor1, interceptor2 } = require("./my_intercept");
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");
const jwt = require("./jwt");

router.get("/product", jwt.verify, async (req, res) => {
  const doc = await Products.find().sort({ created: -1 }); // -1 mean desc
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

router.get("/product/name/:keyword", jwt.verify, async (req, res) => {
  const query = { name: new RegExp("^.*" + req.params.keyword + ".*$", "i") };
  const result = await Products.find(query);
  res.json(result);
});

// Update Product
router.put("/product", (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let doc = await Products.findOneAndUpdate(
        { product_id: fields.product_id },
        fields
      );
      await uploadImage(files, fields);
      res.json({ result: "ok", message: JSON.stringify(doc) });
    });
  } catch (err) {
    res.json({ result: "nok", message: JSON.stringify(err) });
  }
});

// Delete Product
router.delete("/product/id/:id", async (req, res) => {
  let doc = await Products.findOneAndDelete({ product_id: req.params.id });
  res.json({ result: "ok", message: JSON.stringify(doc) });
});

router.get("/product/id/:id", async (req, res) => {
  let doc = await Products.findOne({ product_id: req.params.id });
  res.json({ result: "ok", message: doc });
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
