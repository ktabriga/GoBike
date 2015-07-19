import mongoose from 'mongoose'

var PlaceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date()
  },
  coordenates: [
    {
      latitude: Number,
      longitude: Number
    }
  ]
});

export default mongoose.model('Place', PlaceSchema);