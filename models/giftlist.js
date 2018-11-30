'use strict';
module.exports = (sequelize, DataTypes) => {
  const GiftList = sequelize.define('GiftList', {
    name: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  GiftList.associate = function(models) {
    // associations can be defined here
  };
  return GiftList;
};