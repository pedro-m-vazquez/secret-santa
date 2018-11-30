const db = require('../models');
const Users = db.User;
const SecretSantas = db.SecretSantas;

var express = require('express')
var router = express.Router()

router.get('/users', (req, res) => {
	Users.findAll({
		attributes: ['id', 'first_name', 'last_name', 'email'], 
		include: [{ 
			model: Users, 
			as: 'Relationship', 
			through: {attributes: []},
			attributes: ['first_name', 'last_name'] 
		}]
	}).then((players) => res.status(200).send(players));
});


router.get('/players/:id', (req, res) => {
	Users.findOne({
		where: { id: req.params.id },
		attributes: ['id', 'name', 'chosenTimes'], 
		include: [{ 
			model: Users, 
			as: 'Relationship', 
			attributes: ['name'] 
		}]
	}).then((players) => res.status(200).send(players));
});


router.get('/players/:id/results', (req, res) => {
	Users.findOne({
		where: { id: req.params.id },
		attributes: ['name'], 
		include: [{ 
			model: Users, 
			as: 'Giftees', 
			attributes: ['name'] 
		}]
	}).then((santas) => res.status(200).send(santas.Giftees));
});

router.get('/secret-santa', (req, res) => {
	Users.findAll({
		attributes: ['id', 'name'], 
		include: [{ 
			model: Users, 
			as: 'Giftees', 
			attributes: ['name'] 
		}]
	}).then((santas) => res.status(200).send(santas));
});

router.get('/secret-santa/:id', (req, res) => {
	Users.findOne({
		where: { id: req.params.id },
		attributes: ['name'], 
		include: [{ 
			model: Users, 
			as: 'Giftees', 
			attributes: ['name'] 
		}]
	}).then((santas) => res.status(200).send(santas));
});

router.get('/play', (req, res) => {
	// Clear Table
	SecretSantas.destroy({
	  where: {},
	  truncate: true
	}).then( async () => {
		let playerList = await Users.findAll();
		let resultsArray = [];

		playerList.forEach((currentPlayer) => {
			let playerCode = currentPlayer.code;
			let count = playerList.length;
			let amountToChoose = 3;

			// if ( req.query.code !== currentPlayer.code ) {
			// 	res.status(200).send({ message: "Failed" });
			// }

			for ( let i = 0; i < amountToChoose && playerList.length > 0; ) {
				let resultIndex = Math.floor( Math.random() * (playerList.length) );
				let playerChosenName = playerList[resultIndex].name;

				if ( playerChosenName === currentPlayer.name || playerChosenName === currentPlayer.getRelationship().name )
					continue;
				else 
					i++;

				currentPlayer.addGiftee(playerList[resultIndex]);
				playerList.splice(resultIndex, 1);
			}
		})

		//savePlayerChoices( currentPlayer, resultsArray );
		res.status(200).send({
			results: resultsArray,
		})
	})
	
});

module.exports = router