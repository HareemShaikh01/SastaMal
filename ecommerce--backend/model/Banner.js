const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  pre_title: {
    text: { type: String, required: false },
    price: { type: String, required: false }
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    text_1: { type: String, required: false },
    percent: { type: String, required: false },
    text_2: { type: String, required: false }
  },
  img: {
    type: String,
    required: true // Assuming this is the image URL or path.
  },
  green_bg: {
    type: Boolean,
    required: false,
    default: true
  },
  is_light: {
    type: Boolean,
    required: false,
    default: false
  },
  btn_link: {
    type: String,
    required: false
  }
});

// Create the model based on the schema
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
