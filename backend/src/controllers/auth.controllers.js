const validator = require('validator');
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require('../utils/generateToken');
const { getCookieOptions, getClearCookieOptions } = require('../utils/cookieOptions');
// Register logic here
exports.userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                succcess: false,
                message: "All Filled Is Required"
            })
        }
        if (name.length <= 3) {
            return res.status(400).json({
                succcess: false,
                message: "Name must be at least 3 characters"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                succcess: false,
                message: "This Email Id  is invalid"
            })
        }
        if (!validator.isStrongPassword(password,
            {
                minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
            }
        )) {
            return res.status(404).json({
                succcess: false,
                message: "Password Must Be Sould be 8 Characters One number ,One upeercase , One lowercase , One specialSymbols"
            })
        }
        // password hash and salt logic here
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        // Check user is Alery register or not
        const exitUser = await userModel.findOne({ email });
        if (exitUser) {
            return res.status(409).json({
                success: true,
                message: "This Email id Alreay Register Please Log In !",
            })
        }
        // register.
        const user = await userModel.create({ name, email, password: hashPassword });
        const token = generateToken(user._id, user.role);

        res.cookie("token", token, getCookieOptions())
        return res.status(200).json({
            succcess: true,
            message: "Register SuccessFully",
            data: user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            succcess: false,
            message: error.message || "Internal Server Issu"
        })
    }

}
// login logic here
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                succcess: false,
                message: "All Filled Is Required"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                succcess: false,
                message: "This Email Id  is invalid"
            })
        }
        // Check user is Alery register or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(409).json({
                success: true,
                message: "This Email id Not Register Please Register",
            })
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(409).json({
                succcess: false,
                message: "Password is  Wrong"
            })
        }
        const token = generateToken(user._id, user.role);
        res.cookie("token", token, getCookieOptions())
        return res.status(200).json({
            success: true,
            message: "User Login SuccessFully",
            data: user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            succcess: false,
            message: error.message || "Internal Server Issu"
        })
    }

}
// user profile logi here
exports.userProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "user id not found"
            })
        }
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "user profie fetch successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            succcess: false,
            message: error.message || "Internal Server Issu"
        })
    }
}
exports.userLogout = async (req, res) => {
    try {
        res.clearCookie("token", getClearCookieOptions())
        return res.status(200).json({
            success: true,
            message: "User log out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            succcess: false,
            message: error.message || "Internal Server Issu"
        })
    }
}
