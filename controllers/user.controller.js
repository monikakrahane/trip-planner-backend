const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  //console.log("in signup");
  //console.log(req.body);
  //Sign up
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      // console.log(req.body);
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        //  console.log(" new Email");
        // console.log(req.body);
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            // console.log(req.body.password);
            const user = {
              fname: req.body.fname,
              lname: req.body.lname,
              address: req.body.address,
              mobno: req.body.mobno,
              // dob: req.body.dob,
              email: req.body.email,
              password: hash,
            };
            //   console.log(user);
            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({
                  message: "Something went wrong!",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication successful!",
                    token: token,
                    user: user,
                    status: 200,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid credentials!",
                status: 401,
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
};
