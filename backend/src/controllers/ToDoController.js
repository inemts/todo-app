const { Router } = require("express");
const router = Router();
const todoService = require("../services/TodoService");
const todoMiddleware = require('../middlewares/todoMiddleware');
const doneMiddleware = require('../middlewares/setDoneMiddleware');
const Todo = require('../models/Todo');

router.post("/",[todoMiddleware],async (req, res) => {
	try {
		 const answer = await todoService.create(req.body);
		return res.send(answer);
	} catch (error) {
		return res.status(400).send({ message: "Ooop...Something went wrong" });
	}
});



router.get("/",	async (req, res) => {

try {
	const toDos = await todoService.getToDos();
	return res.send(toDos);
} catch (error) {
	return res.status(400).send({ message: "Ooop...Something went wrong" });
}
});

router.delete("/:id",async (req, res) => {
	const { id } = req.params;
	try {
		const deleteToDos = await todoService.deleteToDo(id);
		return res.send(deleteToDos);
	} catch (error) {
		if (error.statusCode){
			return res.status(error.statusCode).send({ message: error.message });
		}
		return res.status(400).send({ message: "Ooop...Something went wrong" });
	}
});

 router.patch("/:id",[todoMiddleware],async (req, res) => {
	const { id } = req.params;
  	const { title } = req.body;
	
   try {
    const updateTodo = await todoService.updateToDo(id, title)
    return res.send(updateTodo);
  } catch (error) {
   if (error.statusCode){
      return res.status(error.statusCode).send({ message: error.message });
    }
	const { code, keyPattern } = error
	if(code === 11000){
		const [keyValue] = Object.keys(keyPattern);
		return res.status(400).send({ message: `Duplicate ${keyValue}` })
	}
    return res.status(400).send({ message: "Ooop...Something went wrong" });
  }
});

router.patch("/done/:id",[doneMiddleware], async (req, res) => {
  const { id } = req.params; 
  const { done } = req.body;
   try {
    const updateDone = await todoService.updateDone( id, done);
    return res.send(updateDone);
	} catch (error) {
    if (error.statusCode){
      return res.status(error.statusCode).send({ message: error.message });
    }
    return res.status(400).send({ message: "Ooop...Something went wrong" });
  }
});

module.exports = router;
