const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 4200;
const prospectsRouter = require("./routes/prospects");
const filesRouter = require("./routes/files");

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + 'public'));


app.use(cors());

app.use("/prospects", prospectsRouter);
app.use("/files", filesRouter);
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});