const Yup = require("yup");
const catchAsync = require("../middleware/asyncHandler");
const regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const regExPassword =
  /^(?=.*?[A-Z]){1}(?=.*?[a-z]){1}(?=.*?[0-9]){3}(?=.*?[^\w\s]){1}.{6}$/;

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("⚠️ Provide a valid e-mail address!")
    .matches(regExEmail, "⚠️ Format: xxxxx@gmail.com"),
  password: Yup.string()
    .trim()
    .required("⚠️ Please provide your password!")
    .matches(regExPassword, "⚠️ Password is not correct!"),
});

exports.loginValidation = catchAsync(async (req, res, next) => {
  const value = await loginSchema.validate(
    { ...req.body },
    { abortEarly: false, stripUnknown: true }
  );
  req.body = value;
  next();
});
