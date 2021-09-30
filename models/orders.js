"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("orders", {
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
    vendorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Vendor",
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
    },

    status: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });
  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.Packages, {
      foreignKey: "packageId",
    });
    Order.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Order.belongsTo(models.Vendor, {
      foreignKey: "vendorId",
    });
  };
  return Order;
};
