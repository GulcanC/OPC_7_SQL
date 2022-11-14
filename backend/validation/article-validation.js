const Yup = require("yup");
const catchAsync = require("../middleware/asyncHandler");

const articleSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("⚠️ Provide a title!")
    .min(3, "⚠️ The title must contain at least 3 characters!")
    .max(100, "⚠️ The title must contain max. 100 characters!"),
  content: Yup.string()
    .trim()
    .required('⚠️ Write something for your article!"')
    .min(5, "⚠️ The title must contain at least 3 characters!")
    .max(1000, "⚠️ The title must contain max. 100 characters!"),
});
exports.articleValidation = catchAsync(async (req, res, next) => {
  const value = await articleSchema.validate(
    { ...req.body },
    { abortEarly: false, stripUnknown: true }
  );
  req.body = value;
  next();
});
