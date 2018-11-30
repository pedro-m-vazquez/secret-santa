'use strict';

const SecretSantaGroup = require( 'secretsantagroup.js' );

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.belongsToMany(User, {as: 'Relationship', through: 'Relationships', foreignKey: 'user1_id', otherKey: 'user2_id', allowNull: true, constraints: false })

    User.belongsToMany(SecretSantaGroup, { as: 'SecretSantaGroups', through: 'SecretSantaGroupPlayers', foreignKey: 'user_id' });
  };

  return User;
};