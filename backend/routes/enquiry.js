const express = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry,getallEnquiry,} = require("../controller/enquiry");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createEnquiry);
router.get("/all", getallEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/:id", getEnquiry);


module.exports = router;
