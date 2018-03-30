
// mocha gives global access to describe and it....but needs explicit assert
const assert = require('assert');

const User = require('../src/user');


describe('Creating records', () => {

    // once done is an argument, it must be called otherwise stall
    it('Saves a user', (done) => {

        // joe is a model instance
        const joe = new User({name: 'Joe'});

        // .save returns a promise, mongoose has default which is debpriated...mongooese encourging
        // use to use own implementation of a promise....some to consider are
        //   bluebird, q, or ES6 promise

        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    });

});
