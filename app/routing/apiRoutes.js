// API Routes
// =============================================================

// Using fs to Read Data
// linking our routes to read a series of data sources.
var fs = require('fs');

var friends = require("../data/friends");

module.exports = function(app, path) {

	// Show all friends available
	app.get('/api/friends', function(req, res) {
		fs.readFile("app/data/friends.js", "utf8", function(err, data) {
			if (err) {
				return console.log(err);
			} else {
				res.json(JSON.parse(data));
			}
		});
	});

	app.post('/api/friends', function(req, res) {
		var totalDifference = 0;
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		var userData = req.body;
		var userName = userData.name;
		var userScores = userData.scores;


		var b = userScores.map(function(item){
			return parseInt(item, 10);
			});

			userData = {
				name: req.body.name,
				photo: req.body.photo,
				scores: b
			};

			console.log("Name: " + userName);
			console.log("User Score: " + userScores);

			var sum = b.reduce((a,b) => a + b, 0);
			console.log("Sum of users score: " + sum);
			console.log("Best match friend diff" + beseMatch.friendDifference);
			console.log("----------------------------------------------------------");


			for (var i=0; i, friends.length; i++){
				console.log(friends[i].name);
				totalDifference = 0;
				console.log("Total Difference: " + totalDifference);
				console.log("Besr Match Friend Difference" + bestMatch.friendDifference);

				var bfriendScore = friends[i].scores.reduce((a,b) => a+b,0);
				console.log("Total friend score " + bfriendScore);
				totalDifference += Math.abs(sum - bfriendScore);
				console.log("--------------------------------------------------------------");

				if (totalDifference <= bestMatch.friendDifference){
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
				console.log(totalDifference + "Total Difference");
			}
			console.log(bestMatch);
			friends.push(userData);
			console.log("New User Added");
			console.log(userData);
			res.json(bestMatch);
		});

	}