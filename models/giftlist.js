'use strict';

module.exports = (sequelize, DataTypes) => {
  const GiftList = sequelize.define('GiftList', {
  	user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});

  GiftList.associate = function(models) {
    GiftList.belongsTo(models.User, { foreignKey: 'user_id' } );

    GiftList.hasMany(models.ListItem, { foreignKey: 'list_id' });    
  };
  
  return GiftList;
};