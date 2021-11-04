const { request, response } = require("express");
const { v4 } = require("uuid");

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

async function createExpense(req = request, res = response) {
  try {
    let uid = req.uid;
    let expenseId = v4();
    let { description, amount, category } = req.body;

    const { rowCount } = await pool.query(
      ACTIVITIES.createExpense,
      [expenseId, uid, description, "expense", amount, category]
    );

    if (rowCount > 0) {
      return res.json({
        status: "ok",
        message: "Gasto insertado correctamente."
      });
    }

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUserBalance,
  getAllActivities,
  createExpense
};