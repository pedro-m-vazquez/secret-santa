const db = require('../models');
const Players = db.Player;
const SecretSantas = db.SecretSantas;

var express = require('express')
var router = express.Router()

router.get('/players', (req, res) => {
	Players.findAll({
		attributes: ['id', 'name', 'chosenTimes'], 
		include: [{ 
			model: Players, 
			as: 'Relationship', 
			attributes: ['name'] 
		}]
	}).then((players) => res.status(200).send(players));
});


router.get('/players/:id', (req, res) => {
	Players.findOne({
		where: { id: req.params.id },
		attributes: ['id', 'name', 'chosenTimes'], 
		include: [{ 
			model: Players, 
			as: 'Relationship', 
			attributes: ['name'] 
		}]
	}).then((players) => res.status(200).send(players));
});


router.get('/players/:id/results', (req, res) => {
	Players.findOne({
		where: { id: req.params.id },
		attributes: ['name'], 
		include: [{ 
			model: Players, 
			as: 'Giftees', 
			attributes: ['name'] 
		}]
	}).then((santas) => res.status(200).send(santas.Giftees));
});

router.get('/secret-santa', (req, res) => {
	Players.findAll({
		attributes: ['id', 'name'], 
		include: [{ 
			model: Players, 
			as: 'Giftees', 
			attributes: ['name'] 
		}]
	}).then((santas) => res.status(200).send(santas));
});

router.get('/secret-santa/:id', (req, res) => {
	Players.findOne({
		where: { id: req.params.id },
		attributes: ['name'], 
		include: [{ 
			model: Players, 
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
		let playerList = await Players.findAll();
		let resultsArray = [];

		playerList.forEach((currentPlayer) => {
			let playerCode = currentPlayer.code;
			let count = playerList.length;
			let amountToChoose = 3;

			if ( req.query.code !== currentPlayer.code ) {
				res.status(200).send({ message: "Failed" });
				process.exit();
			}

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