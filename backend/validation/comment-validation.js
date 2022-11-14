const Yup = require("yup");

const catchAsync = require("../middleware/asyncHandler");

const commentSchema = Yup.object({
  content: Yup.string()
    .trim()
    .required('⚠️ Write a comment!"')
    .min(3, "⚠️ The comment must contain at least 3 characters!")
    .max(1000, "⚠️ The comment must contain max. 1000 characters!"),
});

exports.commentValidation = catchAsync(async (req, res, next) => {
  const value = await commentSchema.validate(
    { ...req.body },
    { abortEarly: true, stripUnknown: true }
  );
  req.body = value;
  next();
});
