const express = require("express");
const router = express.Router();

const resturantratingController = require('../controllers/resturantratings.controllers');
const checkAuth = require('../middleware/check-auth');

router.post("/add",checkAuth,resturantratingController.addreview);
module.exports = router;
