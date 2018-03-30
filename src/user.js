const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: {
      type: String,
      validate: {
         validator: (name) => name.length > 2,
         message: 'Name must be longer than 2 characters.'
       },
       required: [true, 'Name is required.'] },
   postCount: Number
});

// creates user collection inside db if not exists.  User refers to class User and entire collection
const User = mongoose.model('user', UserSchema);

module.exports = User;
