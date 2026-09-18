const jwt = require("jsonwebtoken")
const authMiddleWare = async (req, res, next) => {
    try {
        // FIX (prod): support Bearer fallback for environments where
        // third-party cookies are blocked. Primary remains httpOnly cookie.
        let token = req.cookies?.token;
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unauthorized User "
            })
        }
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in environment variables");
            return res.status(500).json({
                success: false,
                message: "Server misconfigured: JWT_SECRET missing"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode?.id) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        req.user = decode;
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Session expired, please login again"
            })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token, please login again"
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

module.exports = authMiddleWare