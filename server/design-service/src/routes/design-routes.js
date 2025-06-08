const express = require("express");
const {
  getUserDesigns,
  getUserDesignsByID,
  saveDesign,
  deleteDesign,
} = require("../controllers/design-controller");
const authenticatedRequest = require("../middleware/auth-middleware");

const router = express.Router();

router.use(authenticatedRequest);

router.get("/", getUserDesigns);
router.get("/:id", getUserDesignsByID);
router.post("/", saveDesign);
router.delete("/:id", deleteDesign);

module.exports = router;
