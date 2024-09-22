const express = require("express");
const app = express();
const dotenv  = require("dotenv");
const dbConnect = require("./config/dbConnect.js");
const { notFound, handleError } = require("./middlewares/errorHandler.js");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.routes.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const googleRouter = require("./routes/google.routes.js");
dotenv.config();
const PORT = process.env.PORT || 5000;
const passportSetup = require('./utils/passport.js');
const tutCategoryRouter = require("./routes/tutCategory.routes.js");
const tutorialRouter = require("./routes/tutorial.routes.js");
const newsLetterRouter = require("./routes/newsLetter.routes.js");
const reviewRouter = require("./routes/review.routes.js");
const contactRouter = require("./routes/contact.routes.js");
const videoRouter = require("./routes/video.routes.js");
dbConnect();
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,  // Use the correct MongoDB URI
        ttl: 12 * 60 * 60,
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/users', userRouter);
app.use('/api/tutorial/category', tutCategoryRouter);
app.use('/api/tutorial', tutorialRouter);
app.use('/api/newsletter', newsLetterRouter);
app.use('/api/review', reviewRouter);
app.use('/api/contact', contactRouter);
app.use('/api/video', videoRouter);
app.use("/", googleRouter);
app.get('/', (req, res) => {
    res.send(`<a href="http://localhost:4000/google">Login with google</a>`)
})
app.use(notFound);
app.use(handleError);
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});