const email =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const isValidRegister = (data) => {
  const isValidUserName = data.userName !== "";
  const isValidName = data.name !== "";
  const isValidEmail = email.test(data.email);
  const isValidPassword = data.password !== "" && data.password?.length >= 8;
  const isValidConfirmPassword =
    data.confirmPassword !== "" && data.confirmPassword?.length >= 8;
  const isPasswordsMatched = data.password == data.confirmPassword;

  return {
    isValidUserName,
    isValidName,
    isValidEmail,
    isValidPassword,
    isValidConfirmPassword,
    isPasswordsMatched,
    isAllValid:
      isValidUserName &&
      isValidName &&
      isValidEmail &&
      isValidPassword &&
      isValidConfirmPassword &&
      isPasswordsMatched,
  };
};

export const isValidlogin = (data) => {
  const isValidEmail = email.test(data.email);
  const isValidPassword = data.password !== "" && data.password?.length >= 8;

  return {
    isValidEmail,
    isValidPassword,
    isAllValid: isValidEmail && isValidPassword,
  };
};

export const isValidMessage = (data) => {
  const isValidFirstName = data.firstName !== "";
  const isValidLastName = data.lastName !== "";
  const isValidEmail = email.test(data.email);
  const isValidPhone = data.phone !== "";
  const isValidSubject = data.subject !== "";
  const isValidMessage = data.message !== "";

  return {
    isValidFirstName,
    isValidLastName,
    isValidEmail,
    isValidPhone,
    isValidSubject,
    isValidMessage,
  };
};
