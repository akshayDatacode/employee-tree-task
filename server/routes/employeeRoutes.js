const express = require("express");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.post("/login", employeeController.login);
router.post("/", employeeController.signup);
router.get('/employees', employeeController.getEmployees)
module.exports = router;
