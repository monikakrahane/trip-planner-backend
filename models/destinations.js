"use strict";
module.exports = (sequelize, DataTypes) => {
  const Destinations = sequelize.define("Destinations", {
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    pincode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    visiting_hours: DataTypes.STRING,
    visiting_fee: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  Destinations.associate = function (models) {
    // associations can be defined here
  };
  return Destinations;
};
