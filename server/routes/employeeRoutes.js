const express = require("express");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.post("/login", employeeController.login);

module.exports = router;