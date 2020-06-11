const express = require("express");
const router = express.Router();

const resturantController = require('../controllers/resturants.controllers');
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth,resturantControlle.getAll);
router.post("/add",checkAuth,resturantController.addresturant);
// router.get("/:owner", checkAuth,flatController.getFlat)
// router.put("/:id", checkAuth,flatController.updateBook);
// router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;
