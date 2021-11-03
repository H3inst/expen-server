const { Router } = require("express");
const { getUserBalance } = require("../controllers/activities_controller");
const router = Router();

// get user balance
router.get("/get-balance/:uid", getUserBalance);

module.exports = router;