const mongoose = require('mongoose');
require('mongoose-long');

const schema = mongoose.Schema;

const UserSchema = schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('UserModel', UserSchema);

