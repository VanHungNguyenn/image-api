const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		status: {
			type: String,
			default: 'not used', // "not used", "used" and "error"
		},
		base64Image: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Images', imagesSchema)
