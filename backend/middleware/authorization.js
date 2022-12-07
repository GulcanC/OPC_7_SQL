const appError = require("../errorHandler/appError");
const { User, Comment, Article } = require("../models");

// asyncHandler
const asyncHandler = require("../middleware/asyncHandler");
module.exports = (Model) =>
  asyncHandler(async (req, res, next) => {
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
      return next(new appError("Data can not be found with this ID", 404));
    }
    const ownerId = Model === User ? object.id : object.userId;

    if (ownerId !== reqUserId && !hasAccess) {
      return next(new appError("Request is not authorized", 403));
    }
    next();
  });
