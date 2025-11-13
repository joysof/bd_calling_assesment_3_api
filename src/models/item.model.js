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
        }
    }
)




userSchema.plugin(toJSON);
userSchema.plugin(paginate);