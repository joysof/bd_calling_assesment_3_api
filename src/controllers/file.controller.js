const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { uploadFileService } = require('../services')


const uploadFiles = catchAsync(async (req ,res) =>{
    const userId = req.user._id;
    const parentId = req.body.parentId || null;
    const files = req.files;
    const uploaded = await uploadFileService.uploadFiles(userId , parentId , files)


    res.status(httpStatus.OK).json(
    response({
      message: 'file upload successfully',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: uploaded,
    })
  )
})

const getStroge = catchAsync(async (req,res) =>{
  const userId = req.user._id;
  const storageInfo = await uploadFileService.getStroge(userId)
    res.status(httpStatus.OK).json(
    response({
      message: 'stroge infromation',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: storageInfo,
    })
  )
})

module.exports = {
    uploadFiles,
    getStroge
}