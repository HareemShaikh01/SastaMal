const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// schema design
const validator = require("validator");

const productsSchema = mongoose.Schema({
  id: {
    type: String
  },
  sku: {   //ok
    type: String,
    required: false,
  },

  parent: {   //ok
    type: String,
    required: true,
    trim: true,
  },
  children: {  //ok
    type: String,
    required: true,
    trim: true,
  },

  img: {
    type: String,
    required: false,
    validate: [validator.isURL, "Please provide valid url(s)"]
  },
  title: {  //ok
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [200, "Name is too large"],
  },
  slug: {  //ok
    type: String,
    trim: true,
    required: false,
  },

  price: {
    type: Number,
    required: true,
    min: [0, "Product price can't be negative"]
  },

  previousPrice: {
    type: Number,
    min: [0, "Previous price can't be negative"]
  },

  discount: {
    type: Number,
    min: [0, "Product price can't be negative"]
  },

  quantity: {   //ok
    type: Number,
    required: true,
    min: [0, "Product quantity can't be negative"]
  },

  productType: {  //ok
    type: String,
    required: true,
    lowercase: true,
  },
  description: { //ok
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: false
  },

  category: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: ObjectId,
      ref: "Category",
      required: false,
    }
  },

  unit: {
    type: String,
    required: false,
  },

  imageURLs: [{
    color: {
      name: {
        type: String,
        required: false,
        trim: true,
      },
      clrCode: {
        type: String,
        required: false,
        trim: true,
      }
    },
    img: {
      type: String,
      required: false,
      validate: [validator.isURL, "Please provide valid url(s)"]
    },
    sizes: [String]
  }],

  imageURL: {
    type: [String],  // Array of strings to store multiple image URLs
    required: true,
  },

  brand: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: false,
    }
  },

  status: {
    type: String,
    required: false,
    enum: {
      values: ["in-stock", "out-of-stock", "discontinued"],
      message: "status can't be {VALUE} "
    },
    default: "in-stock",
  },

  reviews: [{ type: ObjectId, ref: 'Reviews' }],

  additionalInformation: [{}],
  tags: [String],
  sizes: [String],

  offerDate: {
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
  },

  active: {
    type: Boolean,
    default: true,
  },

  trending: {
    type: Boolean,
    default: false,
  },

  featured: {
    type: Boolean,
    default: false,
  },

  sellCount: {
    type: Number,
    default: 0,
    min: 0
  }

}, {
  timestamps: true,
})

const Products = mongoose.model('Products', productsSchema)

module.exports = Products;
