const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    DOB: {
        type: String,
    },
    CompanyName: {
        type: String,
        required: false,
    },
    Email: {
        type: String,
        unique: true,
    },
    Location: {
        type: String,
    },
    Position: {
        type: String,
        required: false,
    },
    Password: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});
UserSchema.pre("save", async function (next) {
    if (this.isModified("Password")) {
        this.Password = await bcrypt.hash(this.Password, 12);
        next();
    }
});
UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        res.status(422).json({ msg: "Jwt not set" });
    }
};
const User = new mongoose.model("User", UserSchema);
module.exports = User;
