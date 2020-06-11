const express = require("express");
const router = express.Router();

const resturantController = require('../controllers/resturants.controllers');
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth,resturantController.getAll);
router.post("/add",checkAuth,resturantController.addresturant);
router.get("/:owner", checkAuth,resturantController.getresturant)
 router.put("/:id", checkAuth,resturantController.update);
 router.delete("/:id",checkAuth, resturantController.delete);
module.exports = router;
