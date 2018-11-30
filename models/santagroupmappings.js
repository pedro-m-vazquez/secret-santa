'use strict';

module.exports = (sequelize, DataTypes) => {
  const SantaGroupMappings = sequelize.define('SantaGroupMappings', {
    group_id: DataTypes.INTEGER,
    gifter_id: DataTypes.INTEGER,
    giftee_id: DataTypes.INTEGER
  }, {});

  SantaGroupMappings.associate = function(models) {
    
    SantaGroupMappings.belongsTo(models.SecretSantaGroup, { foreignKey: 'group_id' });

    SantaGroupMappings.belongsTo(models.User, { foreignKey: 'gifter_id' });
  };

  return SantaGroupMappings;
};