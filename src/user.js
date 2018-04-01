const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');
const BlogPostSchema = require('./blogPost');

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
   blogPosts: [
       {
       type: Schema.Types.ObjectId,
       ref: 'blogPost'
       }
   ],
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
    // this = represents the instance of the model - need the word 'function' above
    return this.posts.length;
});

/*
   middleware   .pre

   when a user is deleted, delete all the blogPosts

   operator - in
      - this.blogPosts is an array of all the objectIds of an instance of a user
      -   $in go thru each item and remove from user

    this middleware uses 'next
 */

UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost');

    // blogPost is an array of objectIds
    BlogPost.remove( {_id: { $in: this.blogPosts } })
        .then(() => next());

});

// creates user collection inside db if not exists.  User refers to class User and entire collection
const User = mongoose.model('user', UserSchema);

module.exports = User;
