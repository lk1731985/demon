const express = require("express");
const router = express.Router();
const fn = require("./mock")


router.get("/userinfo", (req, res) => {
    res.send(fn.test())
})


module.exports = router