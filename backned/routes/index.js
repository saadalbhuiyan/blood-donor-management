const express = require("express");
const router = express.Router();

const donorRoute = require("./donorRoute");

router.use("/donors", donorRoute);

module.exports = router;
