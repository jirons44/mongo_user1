const mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // es6 reference implementation inside node


before((done) => {
        mongoose.connect('mongodb://localhost/users_test');

        //event handlers
        mongoose.connection
            .once('open', () => {
                console.log('Good to go! - connection open');
                done();
            })
            .on('error', (error) => {
                console.warn('Warning', error);
        });
});


// needs to take a pause to finish b 4 running every test, using mocha command done callback
//
beforeEach((done) => {

   mongoose.connection.collections.users
       .drop(() => {
          done();
        });
});