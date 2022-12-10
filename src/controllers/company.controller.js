const Company = require('../models/Company')

//Add a new Company
const CreateCompany = async (req, res) => {
    const { CompanyName, CompanyUrl, CompanyLocation, CompanyDescription, CompanyLogo } = req.body;
    try {
        const company = await Company.findOne({ CompanyUrl });
        if (company) {
            res.status(409).json({ Messege: "Company already Exist!", company });
        } else {

            const company = new Company({ CompanyName: CompanyName.toUpperCase(), CompanyUrl, CompanyLocation: CompanyLocation.toUpperCase(), CompanyDescription, CompanyLogo });
            await company.save();
            res.status(201).json({ Messege: "Company Registration Successfull", company });
        }
    } catch (err) {
        res.status(422).json({ Messege: "Something Went Wrong" });
    }
}

const getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findById(id);
        if (company) {
            res.status(202).json({ Messege: "Company Found", company })
        } else {
            res.status(404).json({ Messege: "Not found any company" })
        }

    } catch (err) {
        res.status(422).json({ Messege: "Something Went Wrong" });
    }

}

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        if (companies) {
            res.status(202).json({ Messege: "Companies Found", companies })
        } else {
            res.status(404).json({ Messege: "Not found any company" })
        }

    } catch (err) {
        res.status(422).json({ Messege: "Something Went Wrong" });
    }

}

const getCompanyByName = async (req, res) => {

    const { searchinput } = req.params;
    try {
        const company = await Company.find({ $or: [{ CompanyName: searchinput.toUpperCase() }, { CompanyLocation: searchinput.toUpperCase() }] });
        if (company) {
            res.status(202).json({ Messege: "Company Found", company })
        } else {
            res.status(404).json({ Messege: "No companies found" })
        }

    } catch (err) {
        res.status(422).json({ Messege: "Something Went Wrong" });
    }

}




module.exports = { CreateCompany, getCompanyById, getCompanyByName, getCompanies }