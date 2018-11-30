'use strict';
module.exports = (sequelize, DataTypes) => {
  const SecretSantaGroupPlayers = sequelize.define('SecretSantaGroupPlayers', {
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  SecretSantaGroupPlayers.associate = function(models) {
    // associations can be defined here
  };
  return SecretSantaGroupPlayers;
};