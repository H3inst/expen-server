const { request, response } = require("express");
const pool = require("../database/db");
const { ACTIVITIES } = require("../database/queries");

async function getUserBalance(req = request, res = response) {
  try {
    let uid = req.uid;
    const { rows } = await pool.query(ACTIVITIES.getActualBalanceQuery, [uid]);

    if (rows) {
      return res.json({
        status: "ok",
        user: { user_balance: rows[0].user_balance }
      });
    }

  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllActivities(req = request, res = response) {
  try {
    let uid = req.uid;
    const { rows } = await pool.query(ACTIVITIES.getAllActivities, [uid]);

    if (rows) {
      return res.json({
        status: "ok",
        data: rows
      });
    }

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUserBalance,
  getAllActivities
};