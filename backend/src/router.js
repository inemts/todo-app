const router = require("express").Router();
const { ToDoController } = require("./controllers");

router.use("/todo", ToDoController);

module.exports = router;
