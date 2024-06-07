const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
const prospectsRouter = require("./routes/prospects");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/prospects", prospectsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});