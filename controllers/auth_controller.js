const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../database/db");
const generateJwt = require("../helpers/jwt");
const userIdGenerator = require("../helpers/user-id-generator");

async function validEmail(req = request, res = response) {
  try {
    const { email } = req.body;
    const emailQuery = await pool.query(`SELECT user_email FROM users WHERE user_email = '${email}'`);

    if (emailQuery.rowCount === 0) {
      return res.status(201).json({
        status: "NEW", email: email,
      });
    }

    if (emailQuery.rows) {
      return res.status(201).json({ status: "EXISTS", email: emailQuery.rows[0].user_email });
    }

  } catch (error) {
    throw new Error(error);
  }
}

async function createUser(req = request, res = response) {
  try {
    let { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    const createUserQuery = await pool.query(
      `INSERT INTO users (user_id, user_name, user_email, user_password) VALUES ('${userIdGenerator()}', '${username}', '${email}', '${password}')`
    );

    return res.status(201).json({ status: "CREATED", result: createUserQuery.rows });

  } catch (error) {
    throw new Error(error);
  }
}

async function loginUser(req = request, res = response) {
  try {
    const { email, password: passwordBody } = req.body;
    const loginQuery = await pool.query(
      `SELECT * FROM users WHERE user_email = '${email}'`
    );

    const { user_id, user_password, user_name } = loginQuery.rows[0];
    const validPassword = bcrypt.compareSync(passwordBody, user_password);

    if (!validPassword) {
      return res.status(400).json(
        { status: "FAILED", message: "Incorrect password" }
      );
    }

    const token = await generateJwt(user_id, user_name);
    return res.status(201).json(
      { status: "SUCCESS", message: "Logged in", token }
    );

  } catch (error) {
    throw new Error(error);
  }
}

async function renewToken(req = request, res = response) {
  const uid = req.uid;
  const username = req.username;

  const token = await generateJwt(uid, username);
  
  return res.json({
    status: "OK",
    uid,
  });
}

module.exports = {
  validEmail,
  createUser,
  loginUser,
  renewToken,
};