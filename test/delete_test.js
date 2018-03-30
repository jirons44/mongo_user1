const User = require('../src/user');
const assert = require('assert');

describe('Deleting a user', () => {

    let jimmy;

    beforeEach((done) => {

        jimmy = new User({name: 'Jimmy'});
        jimmy.save()
            .then(() =>  done());
    });

    it('model instance remove', (done) => {

        jimmy.remove()
            .then(() => User.findOne( {name: 'Jimmy'} ))  // retuns another promise
            .then((user) => {

                assert(user === null);

                done();

            });
    });

    it('class method remove', (done) => {

        let searchCriteria = {name: 'Jimmy'};

        User.remove( searchCriteria )                        // retuns a promise
            .then(() => User.findOne( searchCriteria ))      // retuns another promise
            .then((user) => {

                assert(user === null);

                done();

            });
    });


    it('class method findOneAndRemove', (done) => {

        let searchCriteria = {name: 'Jimmy'};

        User.findOneAndRemove( searchCriteria )              // retuns a promise
            .then(() => User.findOne( searchCriteria ))      // retuns another promise
            .then((user) => {

                assert(user === null);

                done();

            });
    });


    it('class method findByIdAndRemove', (done) => {

        let searchCriteria = {_id: jimmy._id};

        User.findOneAndRemove( searchCriteria )              // retuns a promise
            .then(() => User.findOne( searchCriteria ))      // retuns another promise
            .then((user) => {

                assert(user === null);

                done();

            });
    });

});
