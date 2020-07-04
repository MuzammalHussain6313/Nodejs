const express = require("express");
const router = express.Router();

const bookedtableController = require('../controllers/bookedtables.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
router.post("/add",checkAuth, bookedtableController.booktable);
// router.post("/scan",checkAuth,reservedroomController.scan);
//  router.get("/:owner", checkAuth,hotelController.getHotel)
//  router.put("/:id", checkAuth,hotelController.updateHotel);
// router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;