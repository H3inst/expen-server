const { request, response } = require("express");
const pool = require("../database/db");
const { ACTIVITIES } = require("../database/queries");

async function getUserBalance(req = request, res = response) {
  try {
    let { uid } = req.params;
    const { rows } = await pool.query(ACTIVITIES.getActualBalanceQuery, [uid]);

    if (!uid) {
      return res.json({ status: "error", message: "User ID not provided." });
    }

    if (rows) {
      return res.json({
        status: "ok",
        user: {
          user_balance: rows[0].user_balance
        }
      });
    }

  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllActivities(req = request, res = response) {
  try {
    
    
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUserBalance,
  getAllActivities
};