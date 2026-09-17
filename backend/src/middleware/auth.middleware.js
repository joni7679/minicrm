const jwt = require("jsonwebtoken")
const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unauthorized User "
            })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(400).json({
                message: "token is invalid"
            })
        }
        req.user = decode;
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

module.exports = authMiddleWare