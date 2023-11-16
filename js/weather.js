"use strict";
/*
 * 2023
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Version = JSON.parse(fs.readFileSync("../package.json", "utf8")).version;
var ProgramName = "WeatherGetter";
var Date = 2023;
//----------------------------------------------------------------------------------------------------------------------
var API_KEY = "562853829c3a677c00b469cfe4446517";
var city = "Vienna";
var coordUrl = "https://api.openweathermap.org/geo/1.0/direct?q=".concat(city, "&limit=5&appid=").concat(API_KEY);
function fetchCoords() {
    fetch(coordUrl).then(function (response) { return response.json(); }).then(function (data) {
        var jsonData = JSON.stringify(data, null, 2);
        // Write data to a JSON file
        fs.writeFile('coordData.json', jsonData, 'utf8', function (err) {
            if (err) {
                console.error('Error writing to file:', err);
            }
            else {
                console.log('Data written to weatherData.json');
            }
        });
    }).catch(function (error) { return console.error("oopsie: " + error); });
}
function getCountryCode() {
}
function main() {
    console.log(ProgramName + " " + Date + " " + "Version: " + Version + "\n------------------------------------------------------------\n");
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("What do you think of Node.js? ", function (answer) {
        console.log("Thank you for your valuable feedback:", answer);
        rl.close();
    });
    fetchCoords();
    console.log();
}
main();
//# sourceMappingURL=weather.js.map