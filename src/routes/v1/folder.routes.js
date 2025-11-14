const express = require("express")
const auth = require("../../middlewares/auth")
const { folderController } = require("../../controllers")



const folderRoutes= express.Router()

folderRoutes.post(('/') ,auth() ,folderController.createFolder)
// get home page content 
folderRoutes.get(('/home') , auth() , folderController.getHomeContents)
// all favorite content 
folderRoutes.get(('/allFavorite') ,auth() ,folderController.getAllFavoriteItems)

folderRoutes.get(('/:folderId') ,auth() ,folderController.getFolderContents)
// get a folder stroage  
folderRoutes.get(('/:folderId/stats') ,auth() ,folderController.getFolderStats)

// common route 
folderRoutes.patch(('/:itemId/rename') ,auth() ,folderController.renameItem)
folderRoutes.delete(('/:itemId') ,auth() ,folderController.deleteItem)
folderRoutes.post(('/:itemId/copy') ,auth() ,folderController.copyItem)

// set as favorite item 
folderRoutes.put(('/:itemId/favorite') ,auth() ,folderController.setAsFavorite)



module.exports = folderRoutes
