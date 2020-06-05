const express = require("express");
const router = express.Router();

const flatController = require('../controllers/flats.controllers');
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth,flatController.getAll);
router.post("/add",checkAuth,flatController.addBook);
router.post("/review",checkAuth,flatController.addreview);
router.get("/:owner", checkAuth,flatController.getFlat);
router.put("/:id", checkAuth,flatController.updateBook);
router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;
