const AppError = require("../utils/appError");
const { User, Comment, Article } = require("../models");

// catchAsync
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

module.exports = (Model) =>
  catchAsync(async (req, res, next) => {
    const reqUserId = req.auth.userId;
    const hasAccess = req.auth.isAuthorized;
    let objectId;

    if (Model === User) {
      objectId = req.params.userId;
    } else if (Model === Article) {
      objectId = req.params.articleId;
    } else if (Model === Comment) {
      objectId = req.params.commentId;
    }

    const object = await Model.findOne({
      where: {
        id: objectId,
      },
    });
    if (!object) {
      return next(new AppError("Element can not be found with this ID", 404));
    }
    const ownerId = Model === User ? object.id : object.userId;

    if (ownerId !== reqUserId && !hasAccess) {
      return next(new AppError("Request is not authorized", 403));
    }
    next();
  });