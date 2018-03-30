const assert = require('assert');
const User = require('../src/user');

describe('', ()=> {

    let sam;

    beforeEach((done) => {
        sam = new User( {name : 'Sam', postCount: 0});
        sam.save()
            .then( () => done() );
    });

    // helper method
    function assertName(operation, done) {
        operation
            .then( () => User.find( {} ))
            .then((allUsers) => {

                assert(allUsers.length === 1);
                assert(allUsers[0].name === 'Alex');

                done();
            });
    }

    it('a model instance type using set n save', (done)=> {

        sam.set('name', 'Alex');  // changes property, but in memory
        assertName(sam.save(), done);

    });

    it('a model instance can update', (done)=> {

        assertName(sam.update( {name: 'Alex'} ), done);

    });

    it('a model Class can update', (done)=> {

        assertName(User.update( {name: 'Sam'}, {name: 'Alex'} ), done);

    });

    it('a model Class can update', (done)=> {

        assertName(User.findOneAndUpdate( sam.name, {name: 'Alex'} ), done);

    });

    it('a model Class can findByIdAndUpdate', (done)=> {

        assertName(User.findByIdAndUpdate( sam._id, {name: 'Alex'} ), done);

    });

    it('a user can have their postcount incremented by 1', (done)=> {
        // user update operators - $inc

        User.update( { name: 'Sam' }, { $inc: { postCount: 1} })
            .then(() => User.findOne( {name: 'Sam'} ))
            .then((user) => {
                assert(user.postCount === 1 );
                done();
            });
    });

});
