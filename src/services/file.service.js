const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Item, User } = require('../models')

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

const getStroge = async (userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not login ')
  }

  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const TOTAL_LIMIT = user.quotaBytes || 15 * 1024 * 1024 * 1024
  const files = await Item.find({
    userId,
    type: 'file',
  })
  const totalUsed = files.reduce((sum, file) => sum + (file.fileSize || 0), 0)
  const freeBytes = TOTAL_LIMIT - totalUsed
  user.usedBytes = totalUsed
  user.freeBytes = freeBytes < 0 ? 0 : freeBytes
  await user.save()
  return {
    totalBytes: TOTAL_LIMIT,
    usedBytes: totalUsed,
    freeBytes: freeBytes < 0 ? 0 : freeBytes,

    totalGB: (TOTAL_LIMIT / 1024 / 1024 / 1024).toFixed(4),
    usedGB: (totalUsed / 1024 / 1024 / 1024).toFixed(4),
    freeGB: ((freeBytes < 0 ? 0 : freeBytes) / 1024 / 1024 / 1024).toFixed(4),
  }
}

module.exports = {
  uploadFiles,
  getStroge,
}
