const userModel = require("../models/userModel.js");
const AppError = require("../utils/AppError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");


const authMiddleware = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
  
  if (!authorization?.startsWith(process.env.BEARER_TOKEN)) {
    return next(new AppError("Authorization is required or Invalid Bearer key", 401 ));
  }

  const token = authorization.split(process.env.BEARER_TOKEN)[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    
    if (!decoded?.id) {
      return next(new AppError("Invalid token payload", 400 ));
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return next(new Error("Not Registered account", { cause: 404 }));
    }

    req.user = user;
    return next();

  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return next(new Error("Invalid token", { cause: 401 }));
  }

});
const isAdmin = asyncHandler(async(req, res, next) => {
    const {email} = req.user;
    const isAdmin = await userModel.findOne({email: email});
    if (isAdmin.roles !== "admin") {
        return next(new AppError("You are not an admin"))
    } else {
        next();
    }
})
const isInstructor = asyncHandler(async(req, res, next) => {
    const {email} = req.user;
    const isInstructor = await userModel.findOne({email: email});
    if (isInstructor.roles !== "instructor") {
        return next(new AppError("You are not an Instructor"))
    } else {
        next();
    }
})


module.exports = {
    authMiddleware,
    isAdmin,
    isInstructor
}