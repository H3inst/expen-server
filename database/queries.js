const AUTH = {
  validEmailQuery: "SELECT user_email FROM users WHERE user_email = $1",
  createUserQuery: "INSERT INTO users (user_id, user_name, user_email, user_password) VALUES ($1, $2, $3, $4)",
  loginUserQuery: "SELECT * FROM users WHERE user_email = $1"
}
const ACTIVITIES = {
  getActualBalanceQuery: "SELECT user_balance FROM users WHERE user_id = $1",
  getAllActivities: "SELECT * FROM activities WHERE user_id = $1",
}

module.exports = {
  AUTH,
  ACTIVITIES
}