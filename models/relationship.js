'use strict';

module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    user1_id: DataTypes.INTEGER,
    user2_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {});

  Relationship.associate = function(models) {
    Relationship.belongsTo(models.User);
  };

  return Relationship;
};