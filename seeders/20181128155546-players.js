'use strict';

const Players = require('../models').Player;
const sequelize = require('../models').sequelize;

module.exports = {
  up: async (queryInterface, Sequelize) => {

      let findPlayerByName = ( players, name ) => {
        for ( let i = 0; i < players.length; i++ ) {
          if ( players[i].name === name ) {
            return players[i];
          }
        }
      }

      let updatePlayer = (player, partner) => {
        return new Promise(resolve => {
          sequelize.query("UPDATE Players SET relationshipId = " + partner.id + " WHERE id = " + player.id).spread((results, metadata) => {
            resolve(results);
          });
        });        
      }

      let checkIfFinished = (countLeft, resolvePromise) => {
        if (countLeft == 0)
          resolvePromise("Done");
      }

      let combinePartners = async (players, playerName, partnerName) => {
        let player = findPlayerByName( players, playerName );
        let partner = findPlayerByName( players, partnerName );
        await updatePlayer(player, partner);
        await updatePlayer(partner, player);
      }

      await queryInterface.bulkInsert('Players', [

          { name: 'Mario', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Christy', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Alex', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Tatiana', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Cey', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Jesse', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Pia', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Mike', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Dayana', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Peter', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Keissy', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Cami', code: '123', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Steph', code: '123', createdAt: new Date(), updatedAt: new Date() }
        ], {});

        const players = await Players.findAll();

        return new Promise(resolve => {
          let relationshipArray = [
            ["Mario", "Christy"],
            ["Alex", "Tatiana"],
            ["Cami", "Steph"],
            ["Peter", "Keissy"],
            ["Jesse", "Pia"],
            ["Mike", "Dayana"]
          ]          
          let countLeft = relationshipArray.length;

          relationshipArray.forEach( async couple => {
            console.log("Working with " + couple[0] + " and " + couple[1])
            await combinePartners(players, couple[0], couple[1]);
            if ( --countLeft === 0 )
              resolve("Done");
          })
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null, {});
  }
};
