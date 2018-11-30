'use strict';

const SecretSantaGroup = require( 'secretsantagroup.js' );
const User = require( 'user.js' );

module.exports = (sequelize, DataTypes) => {
  const SantaGroupMappings = sequelize.define('SantaGroupMappings', {
    group_id: DataTypes.INTEGER,
    gifter_id: DataTypes.INTEGER,
    giftee_id: DataTypes.INTEGER
  }, {});

  SantaGroupMappings.associate = function(models) {
    
    SantaGroupMappings.belongsTo(SecretSantaGroup, { foreignKey: 'group_id' });

    SantaGroupMappings.belongsTo(User, { foreignKey: 'gifter_id' });
  };

  return SantaGroupMappings;
};