const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments test', () => {

    it('can create a subdocument post', (done) => {

        const joe = new User({ name: 'Jim', posts: [{ title: 'a new post title'}] });

        joe.save()
            .then(() => User.findOne({ name: 'Jim' }))
            .then( (user) => {
                assert(user.posts.length === 1);
                assert(user.posts[0].title === 'a new post title');
                done();
            })

    });


    it('can add a new post to existing user', (done) => {

        const joe = new User({ name: 'Jim', posts: [] });

        joe.save()
            .then( () => User.findOne({ name: 'Jim' }))
            .then( (user) => {

                user.posts.push({title: 'added new post to existing user'})

                return user.save()
            })
            .then( () => User.findOne({ name: 'Jim' }))
            .then( (user) => {

                assert(user.posts.length === 1);
                assert(user.posts[0].title === 'added new post to existing user');

                done();
            });
    });


    it('can remove a post from existing user', (done) => {

        const joe = new User({ name: 'Jim',  posts: [{ title: 'a new post to remove'}]  });

        joe.save()
            .then( () => User.findOne({ name: 'Jim' }))
            .then( (user) => {

                user.posts[0].remove();

                return user.save()
            })
            .then( () => User.findOne({ name: 'Jim' }))
            .then( (user) => {

                assert(user.posts.length === 0);

                done();
            });
    });

});
