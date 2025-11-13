const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const {Item} = require("../models")

const checkDuplicateItem = async ({ userId, name, type, parentId = null }) => {
  const duplicate = await Item.findOne({
    userId,
    type,
    parentId: parentId || null,
    name,
  });

  if (duplicate) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${type} with this name already exists`);
  }
};
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
    
   await checkDuplicateItem({userId , name , type :"folder" , parentId})
    const folder = await Item.create({
        userId : userId,
        type : "folder",
        name,
        parentId : parentId || null
    })
    return folder
}

const getFolderContents = async (userId , folderId = null) =>{
    if (folderId) {
        const folder = await Item.findOne({_id : folderId , userId : userId , type : "folder"})

        if (!folder) {
            throw new ApiError(httpStatus.NOT_FOUND , "Folder not found or not accessible")
        }
    }

    const items = await Item.find({
        userId : userId,
        parentId : folderId || null,
    }).sort({type : 1 , name : 1})
    console.log("folderId " , folderId)
    console.log("userId" , userId)
    return items
}

const getFolderStats = async (userId , folderId = null) =>{
    const items = await Item.find({userId : userId , parentId : folderId || null})
    const totalSize = items.reduce((sum , item) => sum + (item.sizeBytes || 0) , 0)
    
    return {count : items.length , totalSize}
}

const renameItem = async(userId , itemId , newName) =>{
    const item = await Item.findOne({_id : itemId , userId : userId , isDeleted : false})

    if (!item) {
        throw new ApiError(httpStatus.NOT_FOUND ,"item not found")
    }
    item.name = newName
   await checkDuplicateItem({userId , name:newName , type:item.type , parentId: item.parentId || null} )
    await item.save()
    return item;
}

const deleteItem = async (userId , itemId) =>{
    if (!userId) {
        throw new ApiError(httpStatus.UNAUTHORIZED , "you are not login ")
    }
    const item = await Item.findOne({_id : itemId , userId : userId , isDeleted : false})
    if (!item) {
        throw new ApiError(httpStatus.NOT_FOUND , "Item not found ")
    }
    item.isDeleted = true;
    await item.save()
    return {message : "Item delete successfully"}

}

module.exports = {
    createFolder,
    getFolderContents,
    getFolderStats,
    renameItem,
    deleteItem
}