const User = require('../src/user');
const assert = require('assert');

describe('Reading records', () => {

    let joe;

    beforeEach((done) => {

        joe = new User({name: 'Joe'});
        user2 = new User({name: 'Mr. User2'});
        user3 = new User({name: 'Mr. User3'});
        user4 = new User({name: 'Mr. User4'});
        user5 = new User({name: 'Mr. User5'});

        Promise.all([joe.save(), user2.save(),user3.save(), user4.save(), user5.save()])
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

    describe('Reading using skip and limit', () => {

        beforeEach(() => {

        });

        it('find users skip first user and only bring back 2 users', (done) => {

            let searchCriteria = {};

            // sort -1 desc, 1: ascending
            User.find( searchCriteria )
                .sort({name: 1})
                .skip(1)
                .limit(2)
                .then((users) => {

                    assert(users.length === 2 );
                    assert(users[0].name === 'Mr. User2' );
                    assert(users[1].name === 'Mr. User3' );

                    done();

                });
        });

    });

});
