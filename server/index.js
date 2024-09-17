const express = require("express");
const app = express();
const dotenv  = require("dotenv");
const dbConnect = require("./config/dbConnect.js");
const { notFound, handleError } = require("./middlewares/errorHandler.js");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.routes.js");
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/users', userRouter)
dbConnect();
app.use(notFound);
app.use(handleError);
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});