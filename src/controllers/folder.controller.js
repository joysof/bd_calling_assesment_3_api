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
    
    res.status(httpStatus.OK).json(
        response({
            message : "Folder created successfully",
            status : "OK",
            statusCode : httpStatus.CREATED,
            data : folder
        })
    )
})

const getFolderContents = catchAsync(async (req,res) =>{
const {folderId} = req.params;
const userId = req.user._id;
const contens = await folderService.getFolderContents(userId , folderId)

res.status(httpStatus.OK).json(
    response({
        message : "All folder content",
        status : "Ok",
        statusCode : httpStatus.OK,
        data : contens
    })
)
})

const getFolderStats = catchAsync (async (req,res) =>{
    const {folderId} = req.params;
    const userId = req.user._id
    const stats = await folderService.getFolderStats(userId , folderId)

    res.status(httpStatus.OK).json(
    response({
        message : "All folder status",
        status : "Ok",
        statusCode : httpStatus.OK,
        data : stats
    })
)
})

const renameItem = catchAsync(async(req,res) =>{
    const {itemId} = req.params;
    const {newName} = req.body;
    const userId = req.user._id;
    const item = await folderService.renameItem(userId , itemId , newName)
    res.status(httpStatus.OK).json(
    response({
        message : "Rename successfully",
        status : "Ok",
        statusCode : httpStatus.OK,
        data : item
    })
)
}) 
module.exports ={
    createFolder,
    getFolderContents,
    getFolderStats,
    renameItem
}