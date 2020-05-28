const express = require("express");
const router = express.Router();

const roomcodeController = require('../controllers/roomcodes.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
router.post("/add",checkAuth,roomcodeController.addcode);
//  router.get("/:owner", checkAuth,hotelController.getHotel)
//  router.put("/:id", checkAuth,hotelController.updateHotel);
// router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;