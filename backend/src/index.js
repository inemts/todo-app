require('dotenv').config();
const express = require("express");
const app = express();
const router = require("./router");
const port = process.env.PORT;

app.use(express.json());
app.use("/api", router);


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
