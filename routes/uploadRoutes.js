const express = require('express');
const upload = require('../middlewares/upload');
const cloudinary = require('../config/cloudinary');
const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadStream = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const result = await uploadStream(req.file.buffer);

    res.status(200).json({
      message: 'File uploaded successfully!',
      url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;