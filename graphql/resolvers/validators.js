module.exports.validateRegisterNewUser = (
  username,
  email,
  password,
  confirmPassword
) => {
  // Variable to store errors in registration
  const errors = {};
  const regExForEmail =
    /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

  // Check if username is correct
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }

  // Check email
  if (email.trim() === "") {
    errors.email = "Email cannot be empty";
  } else if (!email.match(regExForEmail)) {
    errors.email = "Email not in correct format, must be valid adress";
  }

  // Then check password
  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (password !== config.password) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

module.exports.validateLogin = (username, password) => {
  // Variable to store errors
  const errors = {};

  // Check if username is correct
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }
  // Then check password
  if (password === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
