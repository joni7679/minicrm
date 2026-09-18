const express = require("express");
const { userRegister, userLogin, userProfile, userLogout } = require("../controllers/auth.controllers");
const authMiddleWare = require("../middleware/auth.middleware");
const router = express.Router();

// register route herer
router.post("/register", userRegister);
// login route here
router.post("/login", userLogin)
// profile route here
router.get("/profile", authMiddleWare, userProfile)
// logout route here
router.post("/logout", authMiddleWare, userLogout)



module.exports = router