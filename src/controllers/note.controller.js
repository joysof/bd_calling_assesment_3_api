const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { NoteServices } = require('../services')
const response = require('../config/response')

const createNote = catchAsync(async (req, res) => {
  const userId = req.user._id
  const { name, content, parentId } = req.body
  const note = await NoteServices.createNote(userId, parentId, name, content)

  res.status(httpStatus.OK).json(
    response({
      message: 'note create successfully',
      status: 'Ok',
      statusCode: httpStatus.CREATED,
      data: note,
    })
  )
})

const updateNote = catchAsync(async(req,res) =>{
    const userId = req.user._id;
    const noteId = req.params.noteId;
    const {name , content} = req.body;

    const updated = await NoteServices.updateNote(noteId , userId , name , content)

      res.status(httpStatus.OK).json(
    response({
      message: 'note updated successfully',
      status: 'Ok',
      statusCode: httpStatus.CREATED,
      data: updated,
    })
  )
})
module.exports = {
  createNote,
  updateNote
}
