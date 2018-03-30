const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
   name: {
      type: String,
      validate: {
         validator: (name) => name.length > 2,
         message: 'Name must be longer than 2 characters.'
       },
       required: [true, 'Name is required.']
   },
   posts: [PostSchema],
   likes: Number
});

/*
    virtual...
        -need to use function below so 'this' points to the instance model of User, using
         fat arrow will change 'this' to the whole file.
        -defining a getter postCount....mongoose and javascript will return computed value.
         joe.postCount without () will run a function

*/
UserSchema.virtual('postCount').get(function() {
    // this = represents the instance of the model
    return this.posts.length;
});

// creates user collection inside db if not exists.  User refers to class User and entire collection
const User = mongoose.model('user', UserSchema);

module.exports = User;
