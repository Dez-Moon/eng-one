const express = require("express");
const {
  getTest,
  getTests,
  addTest,
  editTest,
  deleteTest,
  uploadImage,
  getImage,
  finishedTest,
} = require("../controllers/api-test-controller");
const roleMiddleware = require("../middlewares/role-middleware");

const router = express.Router();

// Get tests
router.get("/api/tests", getTests);
// Get tests by id
router.get("/api/test/:id", getTest);
// Add test
router.post("/api/test", addTest);
//Update test
router.put("/api/test/:id", editTest);
// Delete test
router.delete("/api/test/:id", roleMiddleware("ADMIN"), deleteTest);
// Upload image for test
router.post("/api/test-image", uploadImage);
// Get image test by id
router.get("/api/test-image/:name", getImage);
// Add user to PassedTest
router.put("/api/finishTest/:id", finishedTest);
module.exports = router;
