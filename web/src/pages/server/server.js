const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

// 读取JSON数据
const airports = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/airports.json')));
const flights = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/flights.json')));

// 查询所有机场
app.get('/api/airports', (req, res) => {
    res.json(airports);
});

// 根据机场ID和日期查询航班
app.get('/api/flights', (req, res) => {
    const { airportId, date } = req.query;
    const filteredFlights = flights.filter(flight =>
        flight.airportId === parseInt(airportId) && flight.date === date
    );
    res.json(filteredFlights);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
