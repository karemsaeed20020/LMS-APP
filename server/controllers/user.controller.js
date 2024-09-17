const asyncHandler = require("../utils/asyncHandler.js");
const userModel = require("../models/userModel.js");
const AppError = require("../utils/AppError.js");
const generateToken = require("../config/jwtToken.js");

const registerAUser = asyncHandler(async(req, res,next) => {
    const {email} = req.body;
    const findUser = await userModel.findOne({email: email});
    if (!findUser) {
        const createUser = await userModel.create(req.body);
        res.status(200).json({
            status: "Success",
            message: "User created successfully",
            createUser
        })
    } else {
        return next(new AppError("User already exists", 400))
    }
})
const loginAUser = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;
    const findUser = await userModel.findOne({email: email});
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.status(200).json({
            status: "Success",
            message: "Login successfully",
            token: generateToken(findUser?._id),
            role: findUser?.roles,
            username: findUser?.firstname + " " + findUser?.lastname,
            user_image: findUser?.user_image,
        })
    } else {
        return next(new AppError("Invalid Credentials", 404));
    }
})
// Get All Users
const getAllUsers = asyncHandler(async(req, res, next) => {
    const allUser = await userModel.find();
    res.status(200).json({
        status: "Success",
        message: "All Users Fetched Successfully",
        allUser
    })
})
module.exports = {
    registerAUser,
    loginAUser,
    getAllUsers
}