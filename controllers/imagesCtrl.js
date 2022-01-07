const { response } = require('express')
const Images = require('../models/imagesModel')

const imagesCtrl = {
	addImage: async (req, res) => {
		try {
			const { name, base64Image, status } = req.body

			if (!name || !base64Image) {
				return res
					.status(200)
					.json({ msg: 'Please fill in all fields' })
			}

			const newImages = new Images({
				name,
				base64Image,
				status,
			})

			await newImages.save()

			res.status(200).json({ msg: 'Image has been added successfully' })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteImage: async (req, res) => {
		try {
			const { name } = req.params

			const imageDeleted = await Images.findOneAndDelete({ name })
			if (!imageDeleted) {
				return res.status(200).json({ msg: 'Image not found' })
			}

			res.status(200).json({ msg: 'Deleted image successfully' })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateStatusImage: async (req, res) => {
		const { name } = req.params
		const { status } = req.body

		if (!status) {
			return res.status(200).json({ msg: 'Please fill in status' })
		}

		await Images.findOneAndUpdate({ name }, { status }).then((image) => {
			if (!image) {
				return res.status(200).json({ mag: 'Image not found' })
			} else {
				return res
					.status(200)
					.json({ msg: 'Update status successfully' })
			}
		})
	},
	getListImagesError: async (req, res) => {
		try {
			const { page, limit } = req.query

			let conditions = {}

			conditions['status'] = 'error'

			const result = await Images.find(conditions)
				.sort({ createdAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)
				.select('-base64Image')
				.select('-createdAt')
				.select('-updatedAt')
				.select('-__v')

			if (!result) {
				return res.status(200).json({ msg: 'No data matching' })
			}

			const data = await Images.find(conditions)

			res.status(200).json({
				total_data: data.length,
				total: result.length,
				result,
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getListImages: async (req, res) => {
		try {
			const { page, limit } = req.query

			const result = await Images.find()
				.sort({ createdAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)
				.select('-base64Image')
				.select('-createdAt')
				.select('-updatedAt')
				.select('-__v')

			if (!result) {
				return res.status(200).json({ msg: 'No data matching' })
			}

			const data = await Images.find()

			res.status(200).json({
				total_data: data.length,
				total: result.length,
				result,
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = imagesCtrl
