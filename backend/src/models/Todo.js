const { Schema } = require("mongoose");
const conn = require('../conn');
const todoSchema = new Schema({
    title: {
        type: String,
        unique: true,
        index:true
    },
    done: {
        default: false,
        type: Boolean
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: 0
    }
},
    {versionKey:false}
)

const Todo = conn.model('Todo', todoSchema);

module.exports = Todo;