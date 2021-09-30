"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("carts", {
    packageId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Packages",
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
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.Packages, {
      foreignKey: "packageId",
    });
    Cart.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Cart;
};
