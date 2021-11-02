const { request, response } = require("express");
const pool = require("../database/db");
const { ACTIVITIES } = require("../database/queries");

async function getUserBalance(req = request, res = response) {
  try {
    let { userId } = req.body;
    const { rows } = await pool.query(ACTIVITIES.getActualBalanceQuery, [userId]);

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

module.exports = {
  getUserBalance,
}