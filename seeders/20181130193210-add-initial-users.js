'use strict';

const Users = require('../models').User;
const sequelize = require('../models').sequelize;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let findPlayerByName = ( players, name ) => {
      for ( let i = 0; i < players.length; i++ ) {
        if ( players[i].first_name === name ) {
          return players[i];
        }
      }
    }

    let updatePlayer = (player, partner) => {
      return new Promise(resolve => {
        let date = new Date();
        date = toMysqlFormat(date);
        sequelize.query("INSERT INTO Relationships (user1_id, user2_id, type, createdAt, updatedAt) VALUES (" + player.id + ", " + partner.id + ", 0, '" + date + "', '" + date + "')").spread((results, metadata) => {
          resolve(results);
        });
      });        
    }

    let toMysqlFormat = (date) => {
      return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
    }

    let twoDigits = d => {
      if(0 <= d && d < 10) return "0" + d.toString();
      if(-10 < d && d < 0) return "-0" + (-1*d).toString();
      return d.toString();
    }

    let combinePartners = async (players, playerName, partnerName) => {
      let player = findPlayerByName( players, playerName );
      let partner = findPlayerByName( players, partnerName );
      await updatePlayer(player, partner);
      await updatePlayer(partner, player);
    }


    await queryInterface.bulkInsert('Users', [

      { first_name: 'Peter', last_name: 'Vazquez', email: 'pedrovazqueziii@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { first_name: 'Keissy', last_name: 'Leonardo', email: 'keissyleonardo@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Mario', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Christy', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Alex', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Tatiana', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Cey', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Jesse', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Pia', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Mike', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Dayana', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Cami', code: '123', createdAt: new Date(), updatedAt: new Date() },
      // { name: 'Steph', code: '123', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    const players = await Users.findAll();

    return new Promise(resolve => {
      let relationshipArray = [
        ["Peter", "Keissy"],
        // ["Mario", "Christy"],
        // ["Alex", "Tatiana"],
        // ["Cami", "Steph"],
        // ["Jesse", "Pia"],
        // ["Mike", "Dayana"]
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Relationships', null, {});
  }
};
