var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todosSchema = new Schema({
    todo: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean
    }

})


module.exports = mongoose.model("todos", todosSchema)