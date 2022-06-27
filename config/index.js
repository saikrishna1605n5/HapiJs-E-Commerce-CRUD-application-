module.exports = {
	server: {
		host: process.env.HOST,
		port: process.env.PORT,
	},
	swagger: {
		contact: 'sai krishna thatipamula',
		title: 'API Documentation',
	},
	database: {
		uri: process.env.MONGODB_URI,
	},
	auth: {
		jwtSecretKey: process.env.JWT_SECRET_KEY,
		expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
	},
};
