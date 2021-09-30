const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUpVendor(req, res) {
  models.Vendor.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const vendor = {
              fname: req.body.fname,
              lname: req.body.lname,
              company_name: req.body.company_name,
              address: req.body.address,
              pincode: req.body.pincode,
              city: req.body.city,
              state: req.body.state,
              mobno: req.body.mobno,
              email: req.body.email,
              password: hash,
            };

            models.Vendor.create(vendor)
              .then((result) => {
                res.status(201).json({
                  message: "Vendor created successfully",
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

function loginVendor(req, res) {
  models.Vendor.findOne({ where: { email: req.body.email } })
    .then((vendor) => {
      if (vendor === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          vendor.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: vendor.email,
                  vendorId: vendor.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication successful!",
                    token: token,
                    vendor: vendor,
                    status: 200,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid credentials!",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

module.exports = {
  signUpVendor: signUpVendor,
  loginVendor: loginVendor,
};
