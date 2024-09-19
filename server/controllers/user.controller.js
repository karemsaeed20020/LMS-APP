const asyncHandler = require("../utils/asyncHandler.js");
const userModel = require("../models/userModel.js");
const AppError = require("../utils/AppError.js");
const generateToken = require("../config/jwtToken.js");
const { validateMongodbId } = require("../config/validateMongoDbId.js");
const crypto = require("crypto");
const sendEmail = require("../utils/email.js");
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

// Update User Profile
const updateUser = asyncHandler(async(req, res, next) => {
    const {_id} = req.user;
    validateMongodbId(_id);
    const user = await userModel.findByIdAndUpdate(_id, req.body, {new: true});
    res.status(200).json({
        status: "Success",
        message: "Profile Updating Successfully",
        user
    })
})

// delete a user
const deleteUser = asyncHandler((async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    await userModel.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "User Deleted Successfully"
    })
}))

// get a user
const getAUser = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    const getProfile = await userModel.findById(id);
    res.status(200).json({
        status: "Success",
        message: "User Found",
        getProfile
    })

})

const blockUser = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    const block = await userModel.findByIdAndUpdate(id, {isBlocked: true}, {new: true});
    res.status(200).json({
        status: "Success",
        message: "User Blocked Successfully",
        block
    })
})
const unblockUser = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    const unblock = await userModel.findByIdAndUpdate(id, {isBlocked: false}, {new: true});
    res.status(200).json({
        status: "Success",
        message: "User unBlocked Successfully",
        unblock
    })
})

const updatePassword = asyncHandler(async(req, res, next) => {
    const {_id} = req.user;
    const {password} = req.body;
    validateMongodbId(_id);
    const user = await userModel.findById(_id);
    if (user && (await user.isPasswordMatched(password))) {
        return next(new AppError("Please provide a new password instead of old one."))
    } else {
        user.password = password;
        await user.save();
        res.status(200).json({
            status: "Success",
            message: "Password Updated successfully",
        })
    }

})
// Forgot Password Token
const forgotPasswordToken = asyncHandler(async(req, res, next) => {
    const {email} = req.body;
    const user = await userModel.findOne({email: email});
    if (!user) {
        return next(new AppError("User not Exists with this email"));
    }
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetLink = `http://localhost:4000/api/user/reset-password/${token}`;
        
        const message = `Forgot Your Password? Submit a patch request with your new password and passwordConfirm to: ${resetLink}.\nIf you didn't forget your password, please ignore this email`;

        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 min)",
            message
        });

        res.status(200).json({
            status: 'success',
            message: "Token sent to email",
            resetLink // Include reset link in the response if needed
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return next(new AppError("There was an error sending the email, Try again later", 500));   
    }
});
const resetToken = asyncHandler(async(req, res, next) => {
    const {password} = req.body;
    const {token} = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await userModel.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    });
    if (!user) {
        return next(new AppError("Token Expired, Please Try Again"))
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
        status: "Success",
        message: "Password Reset Successfully", 
    })
})

module.exports = {
    registerAUser,
    loginAUser,
    getAllUsers,
    getAUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    updatePassword,
    forgotPasswordToken,
    resetToken
}