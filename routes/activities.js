const { Router } = require("express");
const { getUserBalance, getAllActivities } = require("../controllers/activities_controller");
const validJwt = require("../middlewares/valid-jwt");
const router = Router();

// get user balance
router.get("/get-balance", validJwt, getUserBalance);
// get activitie from a user
router.get("/all", validJwt, getAllActivities)

module.exports = router;