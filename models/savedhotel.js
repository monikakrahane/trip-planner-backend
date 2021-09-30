"use strict";
module.exports = (sequelize, DataTypes) => {
  const Savedhotel = sequelize.define("savedhotels", {
    hotelId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Hotels",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
  });
  Savedhotel.associate = function (models) {
    // associations can be defined here
    Savedhotel.belongsTo(models.Hotels, {
      foreignKey: "hotelId",
    });
    Savedhotel.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Savedhotel;
};
