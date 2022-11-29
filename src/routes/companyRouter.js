const express = require("express");
const router = express.Router();
const { CreateCompany, getCompanyById, getCompanyByName, getCompanies } = require('../controllers/company.controller');

router.post('/create', CreateCompany)
router.get('/:id', getCompanyById)
router.get('/', getCompanies)
router.get('/:name/:location', getCompanyByName)




module.exports = router;