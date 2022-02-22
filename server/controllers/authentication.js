const User = require('../models/user');

exports.signup = function (req, res, next) {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;

	/* ==test if the post request is working==
  res.send({ success: true });
  */

	if (!email || !password) {
		return res
			.status(422)
			.send({ error: 'You must provide email and password' });
	}
	// see if a user with the given email exists
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}
		// if a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		// if a user with email does not exist, create and save user record
		if (!existingUser) {
			const user = new User({
				email: email,
				password: password
			});

			user.save(function (err) {
				if (err) {
					return next(err);
				}
				// respond to request indicating the user was created
				res.json({ success: true });
			});
		}
	});
	// respond to request indicating the user was created
};
