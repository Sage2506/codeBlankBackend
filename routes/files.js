const express = require('express');
const router = express.Router();
const files = require('../services/files');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async function(req, res, next) {
  try {
    res.json(await files.create(req.file.filename, req.body.prospect_id));
  } catch (err) {
    console.error(`Error while creating file`, err.message);
    next(err);
  }
});

module.exports = router