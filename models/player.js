'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: {
	    type: Sequelize.STRING,
	    allowNull: false,
  	},
  	code: {
    	type: Sequelize.INTEGER,
	    allowNull: false,
  	},
  	chosenTimes: {
	    type: Sequelize.INTEGER,
	    defaultValue: 0
  	},
  }, {});

  Player.associate = function(models) {
    // associations can be defined here
    Player.belongsTo(Player, {as: 'Relationship', foreignKey: 'relationshipId', allowNull: true, constraints: false })

    Player.belongsToMany(Player, { as:'Giftees', through: 'SecretSantas', foreignKey: 'santaId', otherKey: 'gifteeId' });
  };

  return Player;
};