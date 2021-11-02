const { Router } = require("express");
const { getUserBalance } = require("../controllers/activities_controller");
const router = Router();

router.post("/get-balance", getUserBalance);

module.exports = router;