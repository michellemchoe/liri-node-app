var dotenv = require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var inquirer = require("inquirer");
var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");

var command = process.argv[2].toLowerCase();

var searchWords = process.argv.slice(3, process.argv.length);

var formattedSearchPhrase = searchWords.join("+");

switch (command) {
    case "concert-this":
        ConcertInfo();
        break;
    case "spotify-this-song":
        SongInfo();
        break;
    case "movie-this":
        MovieInfo();
        break;
    case "do-what-it-says":
        action();
        break;
    default: console.log("\nUse the following template to search LIRI. \n  * concert-this <artist/band>\n  * spotify-this-song <song title>\n  * movie-this <movie title>\n  * do-what-it-says\n");
}

// function ConcertInfo() {
//     if (searchWords.length === 0) {
//         formattedSearchPhrase = "abba";
//     }

//     var bitURL = "https://rest.bandsintown.com/artists/" + formattedSearchPhrase + "/events?app_id=codingbootcamp&date=upcoming";


//     request(bitURL, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//             // var cResults = JSON.parse(body);
//             // var cInfo = "\n```\n" +
//             //     "\n* Venue: \n" +
//             //     cResults.venue.name +
//             //     "\n* Location: \n" +
//             //     cResults.venue.city +
//             //     "\n* Showtime: \n" +
//             //     cResults.datetime +
//             //     "\n```\n";
//             // console.log(body);
//         } else {
//             console.log("Error :" + error);
//             return;
//         }
//     });
// }

function SongInfo() {
    console.log("Song Info " + formattedSearchPhrase);
        if (searchWords.length === 0) {
            searchWords = "the sign";
            console.log(searchWords);
        }

        var spotify = new Spotify({
            id: keys.spotifyID,
            secret: keys.spotifySecret,
        });

    // //     spotify
    // //         .search({ type: 'track', query: searchWords })
    // //         .then(function (response) {
    // //             var sInfo = "\n```\n" +
    // //                 "\n* Song: \n" +
    // //                 + response.tracks[0].name +
    // //                 "\n* Artist(s): \n" +
    // //                 + response.tracks[0].artists[0].name +
    // //                 "\n* Album: \n" +
    // //                 + response.tracks.items[0].album.name +
    // //                 "\n* Preview: \n" +
    // //                 + response.tracks.items[0].preview_url +
    // //                 "\n```\n";
    // //             console.log(sInfo);
    // //         })
    // //         .catch(function (err) {
    // //             console.log(err);
    // //         });
}

function MovieInfo() {
    if (searchWords.length === 0) {
        formattedSearchPhrase = "mr+nobody";
    }

    var omdbURL = "http://www.omdbapi.com/?t=" + formattedSearchPhrase + "&y=&plot=short&apikey=trilogy";
    request(omdbURL, function (error, response, body) {
        console.log("request made");
        if (!error && response.statusCode === 200) {
            var mInfo = "\n`````\n" +
                "* Title:\n    " +
                JSON.parse(body).Title +
                "\n* Release Year: \n    " +
                JSON.parse(body).Year +
                "\n* IMDB Rating: \n    " +
                JSON.parse(body).imdbRating +
                "\n* Rotten Tomatoes: \n    " +
                JSON.parse(body).Ratings[1].Value +
                "\n* Country:\n    " +
                JSON.parse(body).Country +
                "\n* Language: \n    " +
                JSON.parse(body).Language +
                "\n* Plot: \n    " +
                JSON.parse(body).Plot +
                "\n* Actors: \n    " +
                JSON.parse(body).Actors +
                "\n`````\n";
            console.log(mInfo);
        } else {
            console.log("Error :" + error);
            return;
        }
    });
}

function action() {
    console.log("Action");

    // //     fs.readFile("./random.txt", "utf8", function (error, data) {
    // //         if (!error) {
    // //             var xCommand = data.split(",");

    // //             command = xCommand[0];

    // //             searchWords = xCommand.slice(1, xCommand.length);
    // //             formattedSearchPhrase = searchWords.join("+");

    // //             SongInfo();

    // //         } else {
    // //             console.log("Error :" + error);
    // //             return;
    // //         }
    // //     });
}

