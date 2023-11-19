import * as fs from 'fs';
import * as readlineSync from 'readline-sync';

const API_KEY: string = "562853829c3a677c00b469cfe4446517";
const Version: string = JSON.parse(fs.readFileSync("../package.json", "utf8")).version;
const ProgramName = "WeatherGetter";
const Date = 2023;

function fetchCoords(city: string) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async data => {
            const jsonData = JSON.stringify(data, null, 2);
            await fs.promises.writeFile('C:\\Users\\LinusFreistetter\\WebstormProjects\\untitled2\\js\\coordData.json', jsonData, 'utf8');
            console.log('Data written to file successfully');
        })
        .catch(error => {
            console.error('Error fetching or writing data:', error);
        });
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
            await fetchCoords(userInput);

            console.log("\nYour location is " + userInput);
            let data = JSON.parse(fs.readFileSync("C:\\Users\\LinusFreistetter\\WebstormProjects\\untitled2\\js\\coordData.json", "utf8"));
            let longitude = data[0].lon;
            let latitude = data[0].lat;
            console.log(longitude + " " + latitude);
        }
    }
}

main();
