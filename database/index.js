const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost/reviews';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((e) => console.error('Database connection Error: ', e));

const { Schema } = mongoose;

const reviewsSchema = new Schema({
  results: [
    {
      body: String,
      date: String,
      helpfulness: Number,
      photos: [{ id: Number, url: String }],
      rating: Number,
      recommend: Number,
      response: String,
      review_id: Number,
      name: String,
      summary: String,
    },
  ],
  product_id: Number,
  characteristics: {
    Size: {
      value: String,
    },
    Width: {
      value: String,
    },
    Comfort: {
      value: String,
    },
  },
  // photos: [{ id: String, url: String }],
  // name: String,
  // email: String,
  // category: String,
  // default_price: String,
  // description: String,
  // id: Number,
  // style_name: String,
  // slogan: String,
  // style_id: Number,
});
// , { versionKey: false }
const Review = mongoose.model('Review', reviewsSchema);

module.exports = {
  Review,
};
