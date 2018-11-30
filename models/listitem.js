'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListItem = sequelize.define('ListItem', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    status: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER
  }, {});
  ListItem.associate = function(models) {
    // associations can be defined here
  };
  return ListItem;
};