const express = require("express");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.post("/login", employeeController.login);
router.post("/signup", employeeController.signup);
router.post("/", employeeController.createEmployees);
router.get('/employees', employeeController.getEmployees)
router.get('/option/:role', employeeController.getLineManagerOption)
router.delete('/:id', employeeController.deleteEmployee)
module.exports = router;
