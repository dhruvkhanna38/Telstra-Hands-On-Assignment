const express = require("express");
const router  = express.Router();
const path = require("path");
const fs = require("fs");

//root route
router.get("/", function(req, res){
    const landingPagePath = path.join(__dirname, "..", "views" , "landing.ejs");
    res.render(landingPagePath);
});



module.exports = router;