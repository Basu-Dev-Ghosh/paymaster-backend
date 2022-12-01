const Rating = require('../models/Rating')
const Company = require('../models/Company')


//Checking the rater is unique or not
const CheckUniqueRater = async (Companyid, Userid) => {
    try {
        const company = await Company.findById(Companyid);
        const raters = company.Raters;
        const isContained = raters.includes(Userid);
        if (!isContained) {
            const newRaters = [...raters, Userid];
            const sm = await Company.findByIdAndUpdate(Companyid, { Raters: newRaters });
            return true;
        } else {
            return false;
        }

    } catch (err) {
        return false;
    }
}


//Increasing total rating of company
const IncreseRatingOfCompany = async (Companyid, Ratings, Userid) => {
    try {
        const isUniqueRater = await CheckUniqueRater(Companyid, Userid);
        if (isUniqueRater) {

            const company = await Company.findById(Companyid);
            let count = company.RatingCount + 1;
            const otp = ((company.OTP * company.RatingCount) + Ratings.OnTimePayment) / count
            const negotiation = ((company.Negotiation * company.RatingCount) + Ratings.Negotiation) / count;
            const responsive = ((company.Responsive * company.RatingCount) + Ratings.Responsive) / count;
            const ethical = ((company.Ethical * company.RatingCount) + Ratings.Ethical) / count;
            const sm = await Company.findByIdAndUpdate(Companyid, { OTP: otp, Negotiation: negotiation, Responsive: responsive, Ethical: ethical, RatingCount: count });
            return 1;
        }
        else {
            return -1;
        }
    } catch (err) {
        return 0;
    }



}





//Add a new Rating
const CreateRating = async (req, res) => {
    // console.log(req.body);
    const { Review, Ratings, Screenshots, Companyid } = req.body;
    try {
        const rating = new Rating(
            {
                From: req.user_id,
                To: Companyid,
                Review,
                OTP: Ratings.OnTimePayment,
                Negotiation: Ratings.Negotiation,
                Responsive: Ratings.Responsive,
                Ethical: Ratings.Ethical,
                Screenshots

            }
        );
        const isIncreased = await IncreseRatingOfCompany(Companyid, Ratings, req.user_id);
        if (isIncreased === 1) {
            await rating.save();
            res.status(201).json({ Messege: "Rating Added Successfully", rating });
        }
        else if (isIncreased === -1) {
            res.status(403).json({ Messege: "You already rated this company" });
        }
        else {
            res.status(424).json({ Messege: "Rating Failed" });
        }


    } catch (err) {
        res.status(422).json({ Messege: "Something Went Wrong" });
    }
}


const getRatings = async (req, res) => {
    const { id } = req.params;
    try {
        const ratings = await Rating.find({ To: id });
        res.status(202).json({ Messege: "Ratings Found", ratings })

    } catch (err) {
        res.status(422).json({ Messege: "Something Went Wrong" });
    }
}





module.exports = { CreateRating, getRatings }