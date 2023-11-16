/*
 * 2023
 *
 */

//----------------------------------------------------------------------------------------------------------------------
import * as path from "path";
import * as fs from 'fs';
import * as readline from 'readline';


const Version : string = JSON.parse(fs.readFileSync("../package.json","utf8")).version;
const ProgramName = "WeatherGetter";
const Date = 2023;


//----------------------------------------------------------------------------------------------------------------------


const API_KEY : string = "562853829c3a677c00b469cfe4446517";
let city : string = "Vienna";

const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;


function fetchWeather(){
    fetch(apiUrl).then(response => response.json()).then(data => { const jsonData = JSON.stringify(data, null, 2);

        // Write data to a JSON file
        fs.writeFile('weatherData.json', jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Data written to weatherData.json');
            }
        });}).catch(error=>console.error("oopsie: "+error));
}
function getCountryCode(){

}


function main(){
    fetchWeather();

    console.log("\n"  +ProgramName + " " + Date + " " + "Version: " + Version + "\n------------------------------------------------------------\n");
        var readline = require('readline');

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

console.log();
}

main();








