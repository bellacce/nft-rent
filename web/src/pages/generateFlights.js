const fs = require('fs');
const path = require('path');

// 示例数据
const airportNames = [
    'JFK International Airport', 'Los Angeles International Airport', 'Chicago O\'Hare International Airport',
    'San Francisco International Airport', 'Miami International Airport', 'Hartsfield-Jackson Atlanta International Airport',
    'Dallas/Fort Worth International Airport', 'Denver International Airport', 'Seattle-Tacoma International Airport',
    'Orlando International Airport'
];

const cities = [
    'New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami', 'Atlanta', 'Dallas', 'Denver', 'Seattle', 'Orlando'
];

const destinations = [
    'New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami', 'Atlanta', 'Dallas', 'Denver', 'Seattle', 'Orlando',
    'Boston', 'Washington', 'Houston', 'Phoenix', 'Philadelphia', 'San Diego', 'Las Vegas', 'San Antonio', 'Detroit', 'Minneapolis'
];

// 生成随机日期
function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// 生成随机航班号
function getRandomFlightNumber() {
    const airlines = ['AA', 'DL', 'UA', 'SW', 'BA'];
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const number = Math.floor(1000 + Math.random() * 9000).toString();
    return airline + number;
}

// 生成随机机场数据
function generateAirports() {
    const airports = airportNames.map((name, index) => ({
        id: index + 1,
        name: name,
        city: cities[index]
    }));

    return airports;
}

// 生成随机航班数据
function generateFlights(airports) {
    const flights = [];
    const now = new Date();
    const end = new Date();
    end.setMonth(now.getMonth() + 3);

    for (let i = 0; i < 300; i++) {
        const airport = airports[Math.floor(Math.random() * airports.length)];
        const destination = destinations[Math.floor(Math.random() * destinations.length)];
        const date = getRandomDate(now, end);
        const flightNumber = getRandomFlightNumber();

        flights.push({
            id: i + 1,
            airportId: airport.id,
            date: date,
            flightNumber: flightNumber,
            destination: destination
        });
    }

    return flights;
}

// 生成数据并保存到文件
function saveData() {
    const airports = generateAirports();
    const flights = generateFlights(airports);

    const airportsPath = path.join(__dirname, 'data', 'airports.json');
    const flightsPath = path.join(__dirname, 'data', 'flights.json');

    fs.writeFileSync(airportsPath, JSON.stringify(airports, null, 2));
    fs.writeFileSync(flightsPath, JSON.stringify(flights, null, 2));

    console.log(`Generated ${airports.length} airports and ${flights.length} flights.`);
}

saveData();
