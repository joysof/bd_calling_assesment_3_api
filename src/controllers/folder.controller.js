const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { folderService } = require("../services");

const createFolder = catchAsync(async (req , res) =>{
    const {name , parentId} = req.body
    const userId = req.user._id
    const folder = await folderService.createFolder(userId , name , parentId)
})