const express = require("express");
const router = express.Router();

//import data from controllers
const { getAllProducts } = require("../controllers/products");

router.route("/").get(getAllProducts);

// export modules
module.exports = router;
