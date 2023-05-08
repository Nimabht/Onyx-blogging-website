import multer from "multer";
import AppError from "./AppError.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatars");
  },
  filename: function (req, file, cb) {
    if (
      file.originalname === "female-anonymous.png" ||
      file.originalname === "male-anonymous.png" ||
      file.originalname === ""
    ) {
      const ex = AppError.badRequest("Bad file name!");
      cb(ex, null);
    } else {
      cb(null, Date.now() + "-" + file.originalname);
    }
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      const ex = AppError.badRequest(
        "Only .png, .jpg and .jpeg format allowed!"
      );
      return cb(ex, false);
    }
  },
  limits: {
    files: 1,
    fileSize: 1 * 1024 * 1024,
  },
});