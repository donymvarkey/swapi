const mongoose = require('mongoose');
require('mongoose-long');

const schema = mongoose.Schema;

const UserSchema = schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    serviceprovider: {type: String},
    privilege: {type: Number, required: true}
});

module.exports = mongoose.model('UserModel', UserSchema);

