const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Budget', 'Mid-Range', 'Luxury', 'Boutique', 'Resort', 'Other'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    type: String
  }],
  website: String,
  phoneNumber: {
    type: String,
    required: true
  },
  checkInTime: {
    type: String,
    required: true
  },
  checkOutTime: {
    type: String,
    required: true
  },
  amenities: [{
    type: String
  }],
  priceRange: {
    type: String,
    enum: ['$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)', 'Other'],
    required: true // If this field is mandatory
  },
  reservationsNeeded: {
    type: Boolean,
    default: false
  },
  isParkingAvailable: {
    type: Boolean,
    default: false
  },
  isWifiAvailable: {
    type: Boolean,
    default: false
  },
  isPoolAvailable: {
    type: Boolean,
    default: false
  },
  isSpaAvailable: {
    type: Boolean,
    default: false
  },
  isRestaurantAvailable: {
    type: Boolean,
    default: false
  },
  photos: [{
    type: String
  }]
}, { timestamps: true });

// Custom validation for reviews and amenities if needed
HotelSchema.path('reviews').validate(function(reviews) {
  return reviews.length > 0; // Ensure at least one review
}, 'At least one review is required.');

HotelSchema.path('amenities').validate(function(amenities) {
  return amenities.length > 0; // Ensure at least one amenity
}, 'At least one amenity is required.');

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;
