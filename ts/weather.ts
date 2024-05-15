import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import {differenceInHours, differenceInMinutes} from 'date-fns';

//----------------------------------------------------------------------------------------------------------------------

//TODO für user gut machen
const API_KEY: string = "562853829c3a677c00b469cfe4446517";


//----------------------------------------------------------------------------------------------------------------------
const Version: string = JSON.parse(fs.readFileSync("../package.json", "utf8")).version;
const ProgramName = "WeatherGetter";
const Date = 2023;

//----------------------------------------------------------------------------------------------------------------------

let fetchError = false;

//----------------------------------------------------------------------------------------------------------------------


async function fetchCoords(apiUrlNum: number, lon: number, lat: number, city: string) {
    const coordUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const coordFile = '..\\js\\coordData.json';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const weatherFile = "..\\js\\weatherData.json";
    let usedUrl: string;
    let usedFile: string;
    if (apiUrlNum === 0) {
        usedUrl = coordUrl;
        usedFile = coordFile;
    } else if (apiUrlNum === 1) {
        usedUrl = weatherUrl;
        usedFile = weatherFile;
    } else {
        console.error("too stupid for 0 and 1")
        return;
    }

    try {
        const response = await fetch(usedUrl);
        if (!response.ok) {
            fetchError = true;
        }
        const data = await response.json();
        const jsonData = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(usedFile, jsonData, 'utf8');
        console.log('Data written to file successfully');
    } catch (error) {
        console.error('Error fetching or writing data:', error);
    }
}

function input(): string {
    return readlineSync.question("What is your location? \n");
}

async function main() {
    console.log("\n" + ProgramName + " " + Date + " " + "Version: " + Version + "\n------------------------------------------------------------\n");
    let loop = true;
    while (loop) {
        let userInput = input();
        if (userInput.toLowerCase() === "end") {
            loop = false;
        } else {
            await fetchCoords(0, 0, 0, userInput);
            if (fetchError) {
                console.log("Error");
            } else {
                console.log("\nYour location is " + userInput);
                let coordData = JSON.parse(fs.readFileSync("..\\js\\coordData.json", "utf8"));
                let longitude = coordData[0].lon;
                let latitude = coordData[0].lat;
                console.log(longitude + " " + latitude);
                await fetchCoords(1, longitude, latitude, "");
                let weatherData = JSON.parse(fs.readFileSync("..\\js\\weatherData.json", "utf8"))
                console.log(weatherData.weather[0].main);
                console.log(weatherData.weather[0].description);//geht auch in native language, muss ich schauen
                console.log(weatherData.main.temp);
            }
        }
    }
}

main();


//----------------------------------------------------------------------------------------------------------------------

function getTimeOfTheDayFromMillis(n: number) {

    let Date: any;
    const hours = differenceInHours(new Date(0), new Date(n));
    const minutes = differenceInMinutes(new Date(0), new Date(n)) % 60;

    const formattedDuration = `${hours} hours, ${minutes} minutes`;

}
