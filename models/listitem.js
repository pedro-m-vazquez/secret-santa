'use strict';

const User = require( 'user.js' );
const GiftList = require( 'giftlist.js' );

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
    ListItem.belongsTo(User, { foreignKey: 'owner_id' });
    ListItem.belongsTo(GiftList, { foreignKey: 'owner_id' });
  };
  
  return ListItem;
};