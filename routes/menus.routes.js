const express = require("express");
const router = express.Router();

const menuController = require('../controllers/menus.controllers');
const checkAuth = require('../middleware/check-auth');

router.post("/add",checkAuth.menuController.addmenu);
module.exports = router;