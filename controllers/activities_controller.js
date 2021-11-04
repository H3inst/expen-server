const { request, response } = require("express");
const { v4 } = require("uuid");

const pool = require("../database/db");
const { ACTIVITIES } = require("../database/queries");

async function getUserSummary(req = request, res = response) {
  try {
    let uid = req.uid;
    const { rows: balanceRow } = await pool.query(ACTIVITIES.getActualBalanceQuery, [uid]);
    const { rowCount, rows: totalExpensesRow } = await pool.query(ACTIVITIES.getExpensesCount, [uid]);

    let wepa = totalExpensesRow.reduce((acc, el) => {
      return el.activity_amount + acc;  
    }, 0);

    if (balanceRow && totalExpensesRow) {
      return res.json({
        status: "ok",
        user: {
          user_balance: balanceRow[0].user_balance,
          user_total_expenses: rowCount,
          user_total_amount: wepa
        }
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

async function getAllExpenses(req = request, res = response) {
  try {
    let uid = req.uid;
    const { rows } = await pool.query(ACTIVITIES.getAllExpenses, [uid]);

    if (rows) {
      return res.json({ status: "ok", data: { expenses: rows, } });
    }

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUserSummary,
  getAllActivities,
  createExpense,
  getAllExpenses
};