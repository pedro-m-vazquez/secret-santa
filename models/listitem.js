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
    ListItem.belongsTo(models.User, { foreignKey: 'owner_id' });
    ListItem.belongsTo(models.GiftList, { foreignKey: 'owner_id' });
  };
  
  return ListItem;
};