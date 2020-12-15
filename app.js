"use strict";

const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errHandler");
const app = express();
const PORT = process.env.PORT || 3001;
const router = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);
// app.listen(PORT, () => {
//   console.log(`aplikasi bayiku sehat berjalan di port ${PORT}`);
// })

module.exports = app;
