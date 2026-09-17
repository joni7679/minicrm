const express = require("express");
const { singleByIdLeads, addLeads, updateLeads, deleteLeads, leads } = require("../controllers/lead.controllers");
const authMiddleWare = require("../middleware/auth.middleware");
const router = express.Router();
// add leads route
router.post("/", authMiddleWare, addLeads);
// leads list logic here
router.get("/", authMiddleWare, leads)
// serch route
// filter route
// single by leads route
router.get("/:id", authMiddleWare, singleByIdLeads);
// update leads Route
router.patch("/:id", authMiddleWare, updateLeads)
// delete leads Route
router.delete("/:id", authMiddleWare, deleteLeads)
module.exports = router
