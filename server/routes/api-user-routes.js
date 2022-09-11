const express = require("express");
const userController = require("../controllers/api-user-controller");
const { body } = require("express-validator");
const roleMiddleware = require("../middlewares/role-middleware");

const router = express.Router();

router.post(
  "/api/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/api/login", userController.login);
router.post("/api/logout", userController.logout);
router.get("/api/activate/:link", userController.activate);
router.get("/api/refresh", userController.refresh);
router.get("/api/user", userController.getUpdateUserData);
router.put("/api/user-photo", userController.changeUserPhoto);
router.get("/api/user/:id", userController.getUser);
router.get(
  "/api/users",
  roleMiddleware(["ADMIN", "TEST"]),
  userController.getUsers
);
router.get("/api/user-offline", userController.userOffline);
router.post(
  "/api/get-password-recovery-code",
  userController.getPasswordRecoveryCode
);
router.post(
  "/api/check-password-recovery-code",
  userController.checkPasswordRecoveryCode
);

router.put("/api/set-password", userController.setPassword);

module.exports = router;
