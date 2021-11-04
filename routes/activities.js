const { Router } = require("express");
const { getUserBalance, getAllActivities, createExpense } = require("../controllers/activities_controller");
const validJwt = require("../middlewares/valid-jwt");
const router = Router();

// get user balance
router.get("/get-balance", validJwt, getUserBalance);
// get activitie from a user
router.get("/all", validJwt, getAllActivities)
// create a expense
router.post("/expense", validJwt, createExpense);

module.exports = router;