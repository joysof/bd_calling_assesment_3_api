const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const {Item} = require("../models")


const createFolder = async (userId , name , parentId = null)=>{
    if (!name) {
        throw new ApiError(httpStatus.BAD_REQUEST , "Folder name is required")
    }
    if (!userId) {
        throw new ApiError(httpStatus.BAD_REQUEST , "you are not login ")
    }
    if(parentId){
        const parent = await Item.findOne({
            _id : parentId , userId : userId , type : "folder"
        })
        if (!parent) {
            throw new ApiError(httpStatus.BAD_REQUEST , "Parent folder not found or not accessible")
        }
    }
    
    const duplicate = await Item.findOne({
        userId : userId,
        type : "folder",
        parentId : parentId || null,
        name
    })
    if (duplicate) {
        throw new ApiError(httpStatus.BAD_REQUEST , "Folder with this name already exists")
    }
    const folder = await Item.create({
        userId : userId,
        type : "folder",
        name,
        parentId : parentId || null
    })
    return folder
}

module.exports = {
    createFolder
}