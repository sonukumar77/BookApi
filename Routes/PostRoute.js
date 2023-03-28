const express = require("express");
const router = express.Router();
const PostBookController = require("../Controller/PostBookController");


router.post("/", PostBookController.postSingleBook);

router.post("/addbooks", PostBookController.postMultipleBook);


module.exports = router;