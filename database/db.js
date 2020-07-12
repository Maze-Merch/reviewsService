const { Review } = require('./index.js');

const addReview = (reviewObject) => {
  const newReview = new Review(reviewObject);
  return newReview
    // .insertMany()
    .save()
    .then((data) => data)
    .catch((err) => console.log('err', err));
};

const findAll = (productId) => (
  Review
    .find({ product_id: productId })
    .then((data) => data)
    .catch((err) => console.log('err', err))
);

const updateReview = (id, reviewObject) => (
  Review
    .updateOne({ review_id: id }, reviewObject)
    .then((data) => data)
    .catch((err) => console.log('Database function Error: ', err))
);

const deleteReview = (reviewId) => (
  Review
    .deleteOne({ _id: reviewId })
    .then((res) => res)
    .catch((err) => console.log('Database function Error: ', err))
);

module.exports = {
  addReview, findAll, updateReview, deleteReview,
};
