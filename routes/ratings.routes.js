const express = require("express");
const router = express.Router();

const ratingController = require('../controllers/ratings.controllers');
const checkAuth = require('../middleware/check-auth');

router.post("/add",checkAuth,ratingController.addreview);
router.post("/ad", checkAuth,ratingController.getrate);
module.exports = router;
