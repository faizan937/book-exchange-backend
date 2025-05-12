const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  favorite: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
}, { timestamps: true });


module.exports = mongoose.models.User || mongoose.model('User', userSchema);
