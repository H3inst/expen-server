const { Router } = require("express");
const { validEmail, createUser, loginUser, renewToken } = require("../controllers/auth_controller");
const { check } = require("express-validator");
const fieldsValidator = require("../middlewares/fields-validator");

const router = Router();

// api/auth/
router.post(
  "/ask-email",
  [
    check("email", "Email is required").isEmail(),
    fieldsValidator
  ],
  validEmail
);
router.post(
  "/new",
  [
    check("email", "Email is required").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password should have at least five characters").isLength({ min: 5 }),
    fieldsValidator
  ],
  createUser
);
router.post("/", loginUser);
router.get("/renew", renewToken);

module.exports = router;