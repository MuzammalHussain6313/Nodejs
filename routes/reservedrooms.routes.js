const express = require("express");
const router = express.Router();

const reservedroomController = require('../controllers/reservedrooms.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
router.post("/add",checkAuth,reservedroomController.bookroom);
router.post("/scan",checkAuth,reservedroomController.scan);
//  router.get("/:owner", checkAuth,hotelController.getHotel)
//  router.put("/:id", checkAuth,hotelController.updateHotel);
// router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;