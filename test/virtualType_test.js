const assert = require('assert');
const User = require('../src/user');

describe('virtualType test', ()=> {

    it('postcount returns number of posts', (done) => {

        const joe = new User({ name: 'Jim',
            posts: [{ title: 'a new post title'}, { title: 'a 2nd post'}] });

        joe.save()
            .then(() => User.findOne({ name: 'Jim' }))
            .then( (user) => {
                assert(user.postCount === 2);
                done();
            })

    });

});