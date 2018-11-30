'use strict';

const User = require( 'user.js' );
const SantaMappings = require( 'santagroupmappings.js' );

module.exports = (sequelize, DataTypes) => {
  const SecretSantaGroup = sequelize.define('SecretSantaGroup', {
    name: DataTypes.STRING,
    event_date: DataTypes.DATE,
    owner_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    gifts_per_user: DataTypes.INTEGER
  }, {});

  SecretSantaGroup.associate = function(models) {
    SecretSantaGroup.belongsToMany(User, { as: 'Players', through: 'SecretSantaGroupPlayers', foreignKey: 'group_id' });

    SecretSantaGroup.hasMany(SantaMappings, { foreignKey: 'group_id' });
  };
  
  return SecretSantaGroup;
};