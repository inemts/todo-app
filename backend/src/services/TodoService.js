const crypto = require("crypto");
const HttpError = require("../utils/HttpError");
const Todo = require("../models/Todo")
/* 
todo
{
  id: <random>,
  title: string,
  done: boolean
  createdAt: number
}

*/


exports.getToDos =  async () => {
  const toDos = await Todo.find({}).sort({ done: 1 });;
  return toDos;
}

exports.deleteToDo = async (id) => {
 const { deletedCount } = await Todo.deleteOne({_id: id});
  if (!deletedCount) {
    throw new HttpError('todo was not found', 404);
  }
	return {message: 'todo was successfully deleted'};
}

exports.create = async (body) => {
	const todo = await Todo.create(body);
	return todo;
};

exports.updateToDo = async (id, title) => {
  const updatedTodo = await Todo.updateOne( {_id: id}, {title,updatedAt: Date.now()});
  if(!updatedTodo.modifiedCount) {
    throw new HttpError('todo was not found', 404);
  }
  return {message: 'todo was successfully updated'};
}

exports.updateDone = async (id, done) => {
  const updatedTodo = await Todo.findByIdAndUpdate( id, { done }, { new: true });
  return {message: 'done was successfully updated'};
}

