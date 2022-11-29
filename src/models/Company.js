const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
    CompanyName: {
        type: String,
    },
    CompanyUrl: {
        type: String,
    },
    CompanyLocation: {
        type: String,
    },
    CompanyDescription: {
        type: String,
    },
    CompanyLogo: {
        type: String,
        default: "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/company-enterprise-icon.png",
    },
    OTP: {
        type: Number,
        default: 0,

    },
    Negotiation: {
        type: Number,
        default: 0,

    },
    Responsive: {
        type: Number,
        default: 0,
    },
    Ethical: {
        type: Number,
        default: 0,
    },
    RatingCount: {
        type: Number,
        default: 0,

    },
    Raters: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
        }
    ],
});

const Company = new mongoose.model("Company", CompanySchema);
module.exports = Company;
