const Yup = require("yup");
const asyncHandler = require("../middleware/asyncHandler");
const regExText = /^[a-zA-Z\s\'\-]{3,10}$/;

const userSchema = Yup.object({
  firstname: Yup.string()
    .trim()
    .required("⚠️ Provide a valid first name!")
    .matches(regExText, "⚠️ First name must be between 3 and 10 characters!"),
  lastname: Yup.string()
    .trim()
    .required("⚠️ Provide a valid last name!")
    .matches(regExText, "⚠️ Last name must be between 3 and 10 characters!"),
});

exports.userValidation = asyncHandler(async (req, res, next) => {
  const dataToValidate = req.body;
  const value = await userSchema.validate(
    { ...dataToValidate },
    { abortEarly: false, stripUnknown: true }
  );

  req.body = value;
  next();
});
