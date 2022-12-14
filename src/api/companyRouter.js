const express = require("express");
const router = express.Router();
const { CreateCompany, getCompanyById, getCompanyByName, getCompanies } = require('../controllers/company.controller');

router.get('/', getCompanies)
router.post('/create', CreateCompany)
router.get('/:id', getCompanyById)
router.get('/searchinput/:searchinput', getCompanyByName)




module.exports = router;