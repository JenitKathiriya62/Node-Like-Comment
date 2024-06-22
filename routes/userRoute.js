const express = require("express");
const router = express();
router.use(express.json());
const path = require("path");
const multer = require("multer");
const auth = require("../middleware/auth");
const { userRegister, loginUser,logout} = require("../controllers/userControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, path.join(__dirname, "../public/images"));
    }
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const { registerValidator,loginValidator} = require("../helpers/validation");

router.post("/register", upload.single("image"), registerValidator,userRegister);
router.post("/login",loginValidator,loginUser)
router.get("/logout",auth,logout);


module.exports = router;
