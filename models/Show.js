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
       default: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1362px-Placeholder_view_vector.svg.png"
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