const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { folderService } = require('../services')

const createFolder = catchAsync(async (req, res) => {
  const { name, parentId } = req.body
  const userId = req.user._id
  const folder = await folderService.createFolder(userId, name, parentId)

  res.status(httpStatus.OK).json(
    response({
      message: 'Folder created successfully',
      status: 'OK',
      statusCode: httpStatus.CREATED,
      data: folder,
    })
  )
})

const getFolderContents = catchAsync(async (req, res) => {
  const { folderId } = req.params
  const userId = req.user._id
  const contens = await folderService.getFolderContents(userId, folderId)

  res.status(httpStatus.OK).json(
    response({
      message: 'All folder content',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: contens,
    })
  )
})

const getFolderStats = catchAsync(async (req, res) => {
  const { folderId } = req.params
  const userId = req.user._id
  const stats = await folderService.getFolderStats(userId, folderId)

  res.status(httpStatus.OK).json(
    response({
      message: 'All folder status',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: stats,
    })
  )
})

const renameItem = catchAsync(async (req, res) => {
  const { itemId } = req.params
  const { newName } = req.body
  const userId = req.user._id
  const item = await folderService.renameItem(userId, itemId, newName)
  res.status(httpStatus.OK).json(
    response({
      message: 'Rename successfully',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: item,
    })
  )
})

const deleteItem = catchAsync(async (req, res) => {
  const { itemId } = req.params
  const userId = req.user._id
  const deleteItem = await folderService.deleteItem(userId, itemId)
  res.status(httpStatus.OK).json(
    response({
      message: 'delete successfully',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: deleteItem,
    })
  )
})

const copyItem = catchAsync(async (req, res) => {
  const { itemId } = req.params
  const { parentId } = req.body
  const userId = req.user._id
  const copy = await folderService.copyItem(userId, itemId, parentId)

  res.status(httpStatus.OK).json(
    response({
      message: 'copy Item successfully',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: copy,
    })
  )
})

const setAsFavorite = catchAsync(async (req, res) => {
  const { itemId } = req.params
  const userId = req.user._id
  const favorite = await folderService.setAsFavorite(userId, itemId)
  res.status(httpStatus.OK).json(
    response({
      message: 'set favorite item successfully',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: favorite,
    })
  )
})

const getAllFavoriteItems = catchAsync(async (req,res) =>{
    const userId = req.user._id;
    const items = await folderService.getAllFavoriteItems(userId)
      res.status(httpStatus.OK).json(
    response({
      message: 'all favorite items',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: items,
    })
  )
})
module.exports = {
  createFolder,
  getFolderContents,
  getFolderStats,
  renameItem,
  deleteItem,
  copyItem,
  setAsFavorite,
  getAllFavoriteItems
}
