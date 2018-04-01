# mongo_user1
mongo example

-****************************
    continuous test
-****************************
    ....could use mocha --watch....watches for test changes and re-runs..but has issue with mongoose and same instance of mocha
    .....  "test": "mocha --watch"
    ....so using nodemon which will watch for file changes and restart new instance of mocha to test
    ........"test": "nodemon --exec 'mocha -R min'"
    ........  -R and min are to better format outopu

-****************************
-- _id
-****************************
    // mongo has _id field that is generated at creation
    //  _id is an ObjectId  with an underlying string, not a raw string, ...must use toString when comapraing
    //

-****************************
  deleting mongoose is 'remove'
-****************************
      model class has built in
      - remove
      - findOneAndRemove
      - findByIdAndRemove

      Modal Instance
      - remove

  -****************************
    updating mongoose
  -****************************
            model class has built in
            - update
            - findOneAndUpdate
            - findByIdAndUpdate

            Modal Instance
            - update
            - 'set' and 'save'

    -- mongo update modifiers \ operators
       ..can send an instruction to mongo....findAll X and update some value
        i.e. '$inc'  increments the value field by specified amount

  -****************************
    Validation (
  -****************************
    - model instance ...user.validation() or user.validationSync()


  -****************************
    Virtual types
  -****************************

    postCount can look at array of posts to get count

    virtual is off of the schema
    i.e

    UserSchema.virtual('postCount').get(function() {

    });

-****************************
Schema notes
-****************************

    -- large lists....limit number of items when fetching.

    nesting data structures is challenging, but has its place.

        in this example....
          a collection of User, Post, and Comment


-****************************
  middleware
-****************************
  pre and post event ( init, validate, save, remove )

-****************************
  find all users, skip limit and sorting using modifiers
-****************************

