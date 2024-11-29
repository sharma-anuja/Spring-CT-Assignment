const express = require("express");
const {createCompany, deleteCompany, getUserByCompanyId } = require("../controllers/companyController");
const router = express.Router();

router.get("/:id/users", getUserByCompanyId);
router.post("/", createCompany);
router.delete("/:id", deleteCompany);

module.exports = router;
