const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    return res.json({DJ: "drop the code"});
});

module.exports = router; 