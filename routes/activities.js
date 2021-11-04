const { Router } = require("express");
const { getUserSummary, getAllActivities, createExpense, getAllExpenses } = require("../controllers/activities_controller");
const validJwt = require("../middlewares/valid-jwt");
const router = Router();

// get user balance
router.get("/stats", validJwt, getUserSummary);
// get activitie from a user
router.get("/all", validJwt, getAllActivities)
// create a expense
router.post("/expense", validJwt, createExpense);
// get all expenses
router.get("/expenses", validJwt, getAllExpenses);

module.exports = router;