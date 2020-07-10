const express = require('express');
const cors = require('cors');
// const bp = require('body-parser');

const app = express();
// const db = require('../database/index.js');
// const { Review } = require('../database/index');
const { addReview, findAllReviews, updateReview } = require('../database/db');
// const Review = require('../database/index.js');

app.use(cors());
// app.use(bp.json());
// app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//  /reviews/:product_id/list
app.get('/reviews/:product_id/list', (req, res) => {
  // const { productId } = req.query;
  // console.log(res.body);
  findAllReviews()
    // .then((data) => res.json(data))
    .then((data) => res.send(data))
    .catch((err) => console.log('Backend server Error: ', err));
});
// // GET /reviews/:product_id/list
// app.get('/reviews/:product_id/list', (req, res) => {

// });
// // POST /reviews/:product_id
app.post('/reviews/:product_id', (req, res) => {
  // const { productId } = req.query;
  const review = {
    product_id: req.params.product_id,
    review_id: req.body.review_id,
    rating: req.body.rating,
    summary: req.body.summary,
    recommend: req.body.recommend,
    response: req.body.response,
    body: req.body.body,
    reviewer_name: req.body.reviewer_name,
    helpfulness: req.body.helpfulness,
    photos: req.body.photos,
    name: req.body.name,
    email: req.body.email,
    characteristics: req.body.characteristics,
  };
  // console.log(req.params);
  // Review.insertMany(review)
  addReview(review)
    .then((data) => res.json(data))
    .catch((err) => console.log('Backend server Error: ', err));
});
// // PUT /reviews/helpful/:review_id
// app.patch('api/reviews', (req, res) => {
app.put('/reviews/helpful/:review_id', (req, res) => {
  updateReview(req.body)
    .then((data) => res.send(data));
});
// });
// // PUT /reviews/report/:review_id
app.put('/reviews/report/:review_id', (req, res) => {
  updateReview(req.body)
    .then((data) => res.send(data));
});

app.listen(3004, () => console.log('Backend server listening on port 3004'));
