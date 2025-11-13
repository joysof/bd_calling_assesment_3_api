const mongoose = require('mongoose')
const { toJSON, paginate } = require("./plugins");

const itemSchema = mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        type: {
            type : String,
            enum : ["folder" , "file" , "note"],
            required : true
        },
        name : {
            type : String,
            required : true
        },
        parentId :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "item",
            default : null
        },
        sizeBytes :{
            type : Number,
            default : 0
        },
        mimeType : {
            type : String
        },
        storagePath : {
            type : String
        },
        content : {
            type : String
        }
    },{timestamps : true}
)




itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

const Item = mongoose.model("Item" , itemSchema)

module.exports = Item