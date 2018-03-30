const User = require('../src/user');
const assert = require('assert');

describe('Validation records', () => {

    it('requires a user name', () => {

        const user = new User({ name: undefined });

        const validationResult = user.validateSync();

        // console.log(validationResult.errors.name.message);

        assert(validationResult.errors.name.message === 'Name is required.');
    });

    it('a user name is at least 2 characters long', () => {

        const user = new User({ name: 'XX' });

        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
    });

    it('invalid name can not be saved', () => {

        const user = new User({ name: 'XX' });

        user.save()
            .catch( (validationResults) => {
                const { message } = validationResults.errors.name;
                assert(message === 'Name must be longer than 2 characters.');
            });
    });

});
