const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const vendorRoute = require("./routes/vendor");
const destinationRoute = require("./routes/destination");
const hotelsRoute = require("./routes/hotels");

const commentsRoute = require("./routes/comments");
const imageRoute = require("./routes/images");

const packageRoute = require("./routes/package");
const path = require('path');

const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/vendor", vendorRoute);
app.use("/destinations", destinationRoute);
app.use("/hotels", hotelsRoute);
app.use("/comments", commentsRoute);
app.use("/images", imageRoute);

app.use("/packages", packageRoute);
app.use("/", express.static(path.join(__dirname, '/public/images')));
module.exports = app;
//merged
