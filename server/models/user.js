const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define our model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});

// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function (next) {
	// Get access to the user model
	const user = this;
	// Generate a salt, then run callback
	bcrypt.genSalt(10, function (err, salt) {
		if (err) {
			return next(err);
		}
		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) {
				return next(err);
			}
			// override plain text password with encrypted
			user.password = hash;
			//save the model
			next();
		});
	});
});

// create model class
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
