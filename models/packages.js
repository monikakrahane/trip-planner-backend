"use strict";
module.exports = (sequelize, DataTypes) => {
  const Packages = sequelize.define("Packages", {
    tripname: DataTypes.STRING,
    image: DataTypes.STRING,
    duration: DataTypes.STRING,
    description: DataTypes.STRING,
    package_inclusions: DataTypes.STRING,
    amount: DataTypes.STRING,
    vendor_id: DataTypes.STRING,
  });
  Packages.associate = function (models) {
    // associations can be defined here
  };
  return Packages;
};
