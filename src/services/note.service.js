const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Item } = require('../models')


const createNote = async (userId , parentId , name , content) =>{
    if (!name ) {
        throw new ApiError(httpStatus.BAD_REQUEST , "note name is required")
    }

    const note = await Item.create({
        name ,
        userId ,
        parentId : parentId || null,
        type : "note",
        content : content || ""
    })
    return note
}

const updateNote = async(noteId , userId , name , content)=>{
    const note = await Item.findOne({
        _id : noteId,
        userId,
        type : "note"
    })
    console.log("name" , name , "content"  , content)
    if (!note) {
        throw new ApiError(httpStatus.NOT_FOUND , "note not found")
    }
    if(name) note.name = name;
    if (content !== undefined) note.content = content;
    await note.save()
    return note
}
module.exports = {
    createNote,
    updateNote
}