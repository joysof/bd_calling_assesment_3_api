const express = require("express")
const auth = require("../../middlewares/auth")
const { folderController } = require("../../controllers")



const folderRoutes= express.Router()

folderRoutes.post(('/') ,auth() ,folderController.createFolder)


module.exports = folderRoutes
