"use strict";
module.exports = (sequelize, DataTypes) => {
  const Hotels = sequelize.define("Hotels", {
    title: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    pincode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    hotel_type: DataTypes.STRING,
    star: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  Hotels.associate = function (models) {
    // associations can be defined here
  };
  return Hotels;
};
