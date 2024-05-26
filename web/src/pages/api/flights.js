import { promises as fsc } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { airportId, date } = req.query;
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fsc.readFile(jsonDirectory + '/flights.json', 'utf8');
    const flights = JSON.parse(fileContents);
    const filteredFlights = flights.filter(
        (flight) => flight.airportId === parseInt(airportId) && flight.date === date
    );
    res.status(200).json(filteredFlights);
}
