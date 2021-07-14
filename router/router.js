const express = require("express");
const router = express.Router();

const { centerSystem, buyCar } = require("../controller/center");
router.post("/review", centerSystem);
router.post("/buycar", buyCar);
module.exports = router;
