const express = require("express")
const auth = require("../../middlewares/auth")
const { folderController } = require("../../controllers")



const folderRoutes= express.Router()

folderRoutes.post(('/') ,auth() ,folderController.createFolder)
folderRoutes.get(('/:folderId') ,auth() ,folderController.getFolderContents)
folderRoutes.get(('/:folderId/stats') ,auth() ,folderController.getFolderStats)
folderRoutes.patch(('/:itemId/rename') ,auth() ,folderController.renameItem)


module.exports = folderRoutes
