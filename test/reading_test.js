const User = require('../src/user');
const assert = require('assert');

describe('Reading records', () => {

    let joe;

    beforeEach((done) => {

        joe = new User({name: 'Joe'});
        joe.save()
            .then(() =>  done());
    });

    it('finds all users with name as Joe', (done) => {

        let searchCriteria = {name: 'Joe'};

        // mongo has _id field that is generated at creation
        //  _id is an ObjectId  with an underlying string, not a raw string, ...must use toString when comapraing
        //
        User.find( searchCriteria )
            .then((users) => {

               // console.log(users);
                assert(users[0]._id.toString() === joe._id.toString() );

                done();

            });
    });

    it('find a user by an ID', (done) => {

        let searchCriteria = {_id: joe._id};

        User.findOne( searchCriteria )
            .then((user) => {

                assert(user._id.toString() === joe._id.toString() );
                assert(user.name === joe.name );
                assert(user.name === 'Joe' );

                done();

            });
    });

});
