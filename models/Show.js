const mongoose = require('mongoose');
const { Schema } = mongoose;

const showSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title']
    },
    creator: {
      type: String,
    },
    launched: {
      type: Number,
    },
    genre: {
      type: String,
    },
     image: {
       type: String,
       default: ""
    },
      description: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

const Show = mongoose.model('Show', showSchema);
module.exports = Show;