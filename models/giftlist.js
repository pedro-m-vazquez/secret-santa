'use strict';

const User = require( 'user.js' );
const ListItem = require( 'listitem.js' );

module.exports = (sequelize, DataTypes) => {
  const GiftList = sequelize.define('GiftList', {
  	user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});

  GiftList.associate = function(models) {
    GiftList.belongsTo(User, { foreignKey: 'user_id' });

    GiftList.hasMany(ListItem, { foreignKey: 'list_id' });    
  };
  
  return GiftList;
};