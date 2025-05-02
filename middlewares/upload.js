const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(file.mimetype);

    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png, gif) are allowed!'), false);
    }
  },
});

module.exports = upload;