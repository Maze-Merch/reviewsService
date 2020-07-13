const express = require('express');
const cors = require('cors');

const PORT = 3004;
const app = express();
const { addReview, findAll, updateReview } = require('../database/controller');
// const Review = require('../database/index.js');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/reviews/:product_id/list', async (req, res) => {
  // const { productId } = req.query;
  // console.log(req.params);
  const findReviews = await findAll(req.params.product_id);
  // .then((data) => { console.log(data);
  try {
    res.send(findReviews);
  } catch (e) {
    res.status(500).send('Back-end server Error: ', e);
  }
  //  })
  // .catch((err) => console.log('Backend server Error: ', err));
});

app.get('/products/:product_id', async (req, res) => {
  const findProduct = await findAll(req.params.product_id);
  // .then((data) => res.send(data))
  try {
    res.send(findProduct);
  } catch (e) {
    res.status(500).send('Back-end server Error: ', e);
  }
});

app.get('/reviews/:product_id/meta', async (req, res) => {
  const findMeta = await findAll(req.params.product_id);
  // .then((data) => res.send(data))
  try {
    res.send(findMeta);
  } catch (e) {
    res.status(500).send('Back-end server Error: ', e);
  }
});

app.post('/reviews/:product_id', async (req, res) => {
  // const { productId } = req.query;
  const { product_id } = req.params;
  const {
    results,
    characteristics,
    // photos,
    // name,
    // email,
    // category,
    // default_price,
    // description,
    // id,
    // style_name,
    // slogan,
    // style_id,
  } = req.body;

  const {
    body,
    date,
    helpfulness,
    // photos,
    rating,
    recommend,
    response,
    review_id,
    // name,
    summary,
  } = results[0];
  // console.log("results", results);
  const review = {
    results: [
      {
        body,
        date,
        helpfulness,
        photos: results[0].photos,
        rating,
        recommend,
        response,
        review_id,
        name: results[0].name,
        summary,
      },
    ],
    product_id,
    characteristics,
    // photos,
    // name,
    // email,
    // category,
    // default_price,
    // description,
    // id,
    // style_name,
    // slogan,
    // style_id,
  };
  // console.log(req.body);
  const saveReview = await addReview(review);
  // .then((data) => res.json(data))
  try {
    res.json(saveReview);
  } catch (e) {
    res.status(500).send('Back-end server Error: ', e);
  }
});

app.put('/reviews/helpful/:review_id', async (req, res) => {
  const helpful = await updateReview(req.params.review_id, req.body);
  // .then((data) => res.send(data));
  try {
    res.send(helpful);
  } catch (e) {
    res.status(500).send('Back-end server Error: ', e);
  }
});

app.put('/reviews/report/:review_id', async (req, res) => {
  const report = updateReview(req.params.review_id, req.body)
  // .then((data) => res.send(data));
  try {
    res.send(report);
  } catch (e) {
    res.status(500).send('Back-end server Error: ', e);
  }
});

app.listen(PORT, () => console.log(`Backend server listening on port ${PORT}`));
