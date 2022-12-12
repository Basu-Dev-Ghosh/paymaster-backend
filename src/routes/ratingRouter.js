const express = require("express");
const router = express.Router();
const { CreateRating, getRatings, isUserRated, likeRating, dislikeRating } = require('../controllers/rating.controller');
const auth = require("../middlewares/Auth");

router.post('/create', auth, CreateRating)
router.put('/like/:id', auth, likeRating)
router.put('/dislike/:id', auth, dislikeRating)
router.get('/:id', getRatings)
router.get('/israted/:id', auth, isUserRated)





module.exports = router;