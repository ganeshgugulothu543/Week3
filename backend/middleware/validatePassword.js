const validatePassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Add any additional password validation logic here

  next();
};

module.exports = validatePassword;