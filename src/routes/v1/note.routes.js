const express = require("express")
const auth = require("../../middlewares/auth")
const { noteController } = require("../../controllers")

const noteRoutes = express.Router()

noteRoutes.post(('/') ,auth() , noteController.createNote)
noteRoutes.put(('/:noteId') ,auth() , noteController.updateNote)

module.exports = noteRoutes