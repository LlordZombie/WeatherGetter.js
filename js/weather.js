"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = {
        label: 0, sent: function () {
            if (t[0] && 1) throw t[1];
            return t[1];
        }, trys: [], ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;

    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] && 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {value: op[1], done: false};
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];
            y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] && 5) throw op[1];
        return {value: op[0] ? op[1] : void 0, done: true};
    }
};
Object.defineProperty(exports, "__esModule", {value: true});
var fs = require("fs");
var readlineSync = require("readline-sync");
//TODO aus koordinaten wetter machen
var API_KEY = "562853829c3a677c00b469cfe4446517";
//----------------------------------------------------------------------------------------------------------------------
var Version = JSON.parse(fs.readFileSync("../package.json", "utf8")).version;
var ProgramName = "WeatherGetter";
var Date = 2023;
//----------------------------------------------------------------------------------------------------------------------
var fetchError = false;

//----------------------------------------------------------------------------------------------------------------------
function fetchCoords(apiUrlNum, lon, lat, city) {
    return __awaiter(this, void 0, void 0, function () {
        var coordUrl, coordFile, weatherUrl, weatherFile, usedUrl, usedFile, response, data, jsonData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    coordUrl = "https://api.openweathermap.org/geo/1.0/direct?q=".concat(city, "&limit=1&appid=").concat(API_KEY);
                    coordFile = '..\\js\\coordData.json';
                    weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=").concat(API_KEY, "&units=metric");
                    weatherFile = "..\\js\\weatherData.json";
                    if (apiUrlNum === 0) {
                        usedUrl = coordUrl;
                        usedFile = coordFile;
                    } else if (apiUrlNum === 1) {
                        usedUrl = weatherUrl;
                        usedFile = weatherFile;
                    } else {
                        console.error("too stupid for 0 and 1");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(usedUrl)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        fetchError = true;
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    jsonData = JSON.stringify(data, null, 2);
                    return [4 /*yield*/, fs.promises.writeFile(usedFile, jsonData, 'utf8')];
                case 4:
                    _a.sent();
                    console.log('Data written to file successfully');
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error fetching or writing data:', error_1);
                    return [3 /*break*/, 6];
                case 6:
                    return [2 /*return*/];
            }
        });
    });
}

function input() {
    return readlineSync.question("What is your location? \n");
}

function main() {
    return __awaiter(this, void 0, void 0, function () {
        var loop, userInput, coordData, longitude, latitude, weatherData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\n" + ProgramName + " " + Date + " " + "Version: " + Version + "\n------------------------------------------------------------\n");
                    loop = true;
                    _a.label = 1;
                case 1:
                    if (!loop) return [3 /*break*/, 6];
                    userInput = input();
                    if (!(userInput.toLowerCase() === "end")) return [3 /*break*/, 2];
                    loop = false;
                    return [3 /*break*/, 5];
                case 2:
                    return [4 /*yield*/, fetchCoords(0, 0, 0, userInput)];
                case 3:
                    _a.sent();
                    if (fetchError) {
                    }
                    console.log("\nYour location is " + userInput);
                    coordData = JSON.parse(fs.readFileSync("..\\js\\coordData.json", "utf8"));
                    longitude = coordData[0].lon;
                    latitude = coordData[0].lat;
                    console.log(longitude + " " + latitude);
                    return [4 /*yield*/, fetchCoords(1, longitude, latitude, "")];
                case 4:
                    _a.sent();
                    weatherData = JSON.parse(fs.readFileSync("..\\js\\weatherData.json", "utf8"));
                    console.log(weatherData.weather[0].main);
                    _a.label = 5;
                case 5:
                    return [3 /*break*/, 1];
                case 6:
                    return [2 /*return*/];
            }
        });
    });
}

main();
//# sourceMappingURL=weather.js.map