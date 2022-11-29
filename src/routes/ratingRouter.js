const express = require("express");
const router = express.Router();
const { CreateRating, getRatings } = require('../controllers/rating.controller');
const auth = require("../middlewares/Auth");

router.post('/create', auth, CreateRating)
router.get('/:id', getRatings)





module.exports = router;