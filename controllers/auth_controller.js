const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../database/db");
const generateJwt = require("../helpers/jwt");
const userIdGenerator = require("../helpers/user-id-generator");
const { AUTH } = require("../database/queries");

async function validEmail(req = request, res = response) {
  try {
    const { email } = req.body;
    const { rows, rowCount } = await pool.query(AUTH.validEmailQuery, [email]);

    if (rowCount === 0) {
      return res.json({
        status: "ok", account: "NEW", email: email,
      });
    }

    if (rows) {
      return res.json({
        status: "ok",
        account: "EXIST",
        email: rows[0].user_email
      });
    }

  } catch (error) {
    throw new Error(error.message);
  }
}

async function createUser(req = request, res = response) {
  try {
    let { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    const userId = userIdGenerator();
    const token = await generateJwt(userId, username);

    await pool.query(
      AUTH.createUserQuery,
      [userId, username, email, password]
    );
    return res.json({
      status: "ok",
      account: "CREATED",
      message: "Cuenta creada con éxito",
      token
    });

  } catch (error) {
    throw new Error(error.message);
  }
}

async function loginUser(req = request, res = response) {
  try {
    const { email, password: passwordBody } = req.body;
    const { rows } = await pool.query(AUTH.loginUserQuery, [email]);

    const { user_id, user_password, user_name } = rows[0];
    const validPassword = bcrypt.compareSync(passwordBody, user_password);

    if (!validPassword) {
      return res.json(
        { status: "FAILED", message: "La contraseña ingresada no es correcta." }
      );
    }

    const token = await generateJwt(user_id, user_name);
    return res.json({
        status: "SUCCESS",
        account: "LOGGED",
        message: "Inicio de sesión exitoso.",
        token
      });

  } catch (error) {
    throw new Error(error.message);
  }
}

async function renewToken(req = request, res = response) {
  const uid = req.uid;
  const username = req.username;

  const token = await generateJwt(uid, username);

  return res.json({
    status: "ok",
    token
  });
}

module.exports = {
  validEmail,
  createUser,
  loginUser,
  renewToken,
};