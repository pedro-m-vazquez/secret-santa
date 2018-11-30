'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.belongsToMany(models.User, {as: 'Relationship', through: 'Relationships', foreignKey: 'user1_id', otherKey: 'user2_id', allowNull: true, constraints: false })

    User.belongsToMany(models.SecretSantaGroup, { as: 'SecretSantaGroups', through: 'SecretSantaGroupPlayers', foreignKey: 'user_id' });
  };

  return User;
};