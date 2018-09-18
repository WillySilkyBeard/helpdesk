const mongoose = require('mongoose');
const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // user: {
  //   ref: 'users',
  //   type: Schema.Types.ObjectId
  // },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersCollection'
  },
  date: {
    type: Date,
    default: Date.now
}
}, {
  versionKey: false,
  collection: "TasksCollection"
});

mongoose.model('Task', Schema);
