const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');



describe('association test', () => {

    let jim, blogPost, comment;

    beforeEach( (done) => {
        jim = new User( {name: 'Jim'});
        comment = new Comment({ content: 'a comment content'});
        blogPost = new BlogPost({ title: 'a blog post title', content: 'a blog post content'});

        comment.user = jim;
        jim.blogPosts.push(blogPost);
        blogPost.comments.push(comment);

        // es6 promise.all

        Promise.all([ jim.save(), blogPost.save(), comment.save() ])
            .then(() => done());

    });

    it('saves a relation between user and a blogpost', (done) => {

        /*.findOne is a query, but we want to modify this query...a modifier to the query
            .populate is a modifier
        */

        User.findOne({name: 'Jim'}).populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts.length === 1);
                assert(user.blogPosts[0].title === 'a blog post title');
                assert(user.blogPosts[0].content === 'a blog post content');

                done();
            })
    });

    it('find all info about Jim, blogPosts and comments ', (done) => {

        // populate blogPosts, and inside blogPosts populate the comments in the model comment
        User.findOne({name: 'Jim'})
            .populate( {path: 'blogPosts',
                        populate: {
                            path: 'comments',
                            model: 'comment',
                            populate: {
                                path: 'user',
                                model: 'user'
                            }
                        }
            })
            .then((user) => {
                //console.log(user.blogPosts[0].comments[0].user.name);

                let { blogPosts  } = user;

                assert(blogPosts.length === 1);
                assert(blogPosts[0].title === 'a blog post title');
                assert(blogPosts[0].content === 'a blog post content');
                assert(blogPosts[0].comments[0].content === 'a comment content');
                assert(blogPosts[0].comments[0].user.name === 'Jim');
                assert(user._id.toString() === user.blogPosts[0].comments[0].user._id.toString());

                done();
            })
    });



});
