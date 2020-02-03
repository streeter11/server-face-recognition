const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Data entry fields cannot be blank");
  }
  db.select("email", "hash").from("login")
  .where("email", "=", email)
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select("*").from("users")
              .where("email", "=", email)
              .then(user => {
                res.json(user[0])
              })
              .catch(err => res.status(400).json("Could not find user"))
      } else {
        res.status(400).json("Incorrect Credentials. Please try again")
      }
  })
  .catch(err => res.status(400).json("Failed to sign in. Please contact administrator"))
}

module.exports = {
  handleSignIn: handleSignIn
};