'use strict';

const User = require( 'user.js' );

module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    user1_id: DataTypes.INTEGER,
    user2_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {});

  Relationship.associate = function(models) {
    Relationship.belongsTo(User);
  };

  return Relationship;
};