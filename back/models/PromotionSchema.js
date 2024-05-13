const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    title: String,
    description: String,
    discountPercentage: Number,
    startDate: Date,
    endDate: Date,
});

module.exports = mongoose.model('Promotion', PromotionSchema);
export default PromotionSchema;