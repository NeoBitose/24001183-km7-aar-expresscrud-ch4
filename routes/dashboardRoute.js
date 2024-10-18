const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");
const upload = require("../middlewares/uploader")

// Cars API
router.get("/dashboard", dashboardController.userPage);
router.get("/dashboard/create", dashboardController.createPage);
router.post("/dashboard/create", upload.single('photo'), dashboardController.insertUser);

module.exports = router;
