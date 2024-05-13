import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    productid: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    promotionalPrice:{type: Number},
    price: { type: Number, required: true },
    instock: { type: Number, required: true },
    brand: { type: String, required: true }, 
    rating: { type: Number, required: true },
    numReview: { type: Number, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    promo: { type: Number},
    
   
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;