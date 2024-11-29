const express = require("express");
const { createUser, listUsers, userCompanyAllocation } = require("../controllers/userController");
const router = express.Router();

router.post("/", createUser);
router.get("/", listUsers);
router.post("/allocate", userCompanyAllocation);

module.exports = router;
