const express = require("express")

const auth = require("../../middlewares/auth")
const { fileController } = require("../../controllers")

const upload = require("../../middlewares/messageFileUpload")("upload")

const fileRouter = express.Router()


fileRouter.post("/" , auth() , upload.any() ,fileController.uploadFiles)



module.exports = fileRouter