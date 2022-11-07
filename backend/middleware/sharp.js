const sharp = require("sharp");
const fs = require("fs");

// mime types, file extensions
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// catchAsync
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

module.exports = catchAsync(async (req, res, next) => {
  //  fieldname image or profilPicture ?
  if (req.files) {
    const file = req.files.profilPicture
      ? req.files.profilPicture[0]
      : req.files.image[0];

    // create new file name, replace spaces by underscore
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    const filename = `${name}${Date.now()}.${extension}`;
    const dirnames = ["user-image", "article-image"];

    // create folders if they do not exist
    await Promise.all(
      dirnames.map((dirname) =>
        fs.promises
          .access(`images/${dirname}`)
          .catch(() => fs.promises.mkdir(`images/${dirname}`))
      )
    );

    // resize images
    const resizeOptions = req.files.profilPicture
      ? { width: 260, height: 260 }
      : { width: 1300, withoutEnlargement: true };

    const dirname = req.files.profilPicture ? "user-image" : "article-image";

    await sharp(file.buffer)
      .resize(resizeOptions)
      .toFile(`images/${dirname}/${filename}`);

    req.file = { filename: filename };
  }
  next();
});
