"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    address: DataTypes.STRING,
    mobno: DataTypes.STRING,
    //dob: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
