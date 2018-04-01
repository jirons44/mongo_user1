const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('middle ware', () => {

    let jim, blogPost, comment;

    beforeEach( (done) => {
        jim = new User( {name: 'Jim'});
        blogPost = new BlogPost({ title: 'a blog post title', content: 'a blog post content'});

        jim.blogPosts.push(blogPost);

        // es6 promise.all

        Promise.all([ jim.save(), blogPost.save() ])
            .then(() => done());

    });

    it('removes a user and, thru middleware UserSchema.pre, removes blogPosts too', (done) => {

        jim.remove()
            .then(() => BlogPost.count())
            .then((numOfBlogPost) => {

                assert(numOfBlogPost === 0);

                done();
            });

    });
});



