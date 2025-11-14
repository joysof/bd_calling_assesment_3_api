const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Item } = require('../models')

const uploadFiles = async (userId, parentId, files) => {
  if (!files || files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No files uploaded')
  }
  const uploadedItems = []
  for (let file of files) {
    const created = await Item.create({
      name: file.originalname,
      type: 'file',
      userId,
      parentId: parentId || null,
      fileUrl: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
    })
    uploadedItems.push(created)
  }
  return uploadedItems
}

module.exports = {
    uploadFiles
}