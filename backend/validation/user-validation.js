const Yup = require("yup");

const catchAsync = require("../middleware/asyncHandler");

const userSchema = Yup.object({
  firstname: Yup.string()
    .trim()
    .required("⚠️ Provide a valid first name!")
    .matches(
      /^[a-zA-Z\s\'\-]{3,10}$/,
      "⚠️ First name must be between 3 and 10 characters!"
    ),
  lastname: Yup.string()
    .trim()
    .required("⚠️ Provide a valid last name!")
    .matches(
      /^[a-zA-Z\s\'\-]{3,10}$/,
      "⚠️ Last name must be between 3 and 10 characters!"
    ),
});

exports.userValidation = catchAsync(async (req, res, next) => {
  const dataToValidate = req.body;
  const value = await userSchema.validate(
    { ...dataToValidate },
    { abortEarly: false, stripUnknown: true }
  );

  req.body = value;
  next();
});
