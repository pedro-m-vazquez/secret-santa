'use strict';
module.exports = (sequelize, DataTypes) => {
  const SecretSantas = sequelize.define('SecretSantas', {
    santaId: DataTypes.INTEGER,
    gifteeId: DataTypes.INTEGER
  }, {});

  SecretSantas.associate = function(models) {
    // associations can be defined here
  };

  return SecretSantas;
};