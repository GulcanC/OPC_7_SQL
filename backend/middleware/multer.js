const multer = require("multer");

// mime types, file extensions
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// maximum authorized file size 3Mo
const maxSize = 3 * 1024 * 1024;

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (`${file.mimetype}` in MIME_TYPES) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Format is not accepted!"));
    }
  },
  limits: { fileSize: maxSize },
}).fields([
  // profilPicture comes from model user, image comes from model article
  { name: "profilPicture", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

module.exports = (req, res, next) => {
  upload(req, res, (err) => (err ? res.status(400).json(err) : next()));
};
