module.exports = {
	server: {
		host: process.env.HOST,
		port: process.env.PORT,
	},
	swagger: {
		contact: 'Rajeshwar Patlolla',
		title: 'Ionic App API Documentation',
	},
	database: {
		uri: process.env.MONGODB_URI,
	},
	auth: {
		jwtSecretKey: process.env.JWT_SECRET_KEY,
		expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
	},
};
